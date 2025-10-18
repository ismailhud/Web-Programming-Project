# Entity Relationship Diagram (ERD)

## Parking Management System Database Design

### Entities and Relationships

#### 1. User Entity
- **user_id** (Primary Key, INT, Auto Increment)
- **name** (VARCHAR(100), NOT NULL)
- **email** (VARCHAR(150), UNIQUE, NOT NULL)
- **phone** (VARCHAR(20), NOT NULL)
- **password** (VARCHAR(255), NOT NULL) - Hashed
- **user_type** (ENUM: 'customer', 'admin', 'staff')
- **address** (TEXT)
- **status** (ENUM: 'active', 'inactive', 'suspended', DEFAULT: 'active')
- **created_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)
- **updated_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP ON UPDATE)

#### 2. Zone Entity
- **zone_id** (Primary Key, INT, Auto Increment)
- **zone_name** (VARCHAR(100), NOT NULL)
- **location** (VARCHAR(255), NOT NULL)
- **zone_type** (ENUM: 'outdoor', 'indoor', 'covered')
- **total_capacity** (INT, NOT NULL)
- **available_spots** (INT, NOT NULL)
- **hourly_rate** (DECIMAL(10,2), NOT NULL)
- **status** (ENUM: 'active', 'inactive', 'maintenance', DEFAULT: 'active')
- **created_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)
- **updated_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP ON UPDATE)

#### 3. Spot Entity
- **spot_id** (Primary Key, INT, Auto Increment)
- **zone_id** (Foreign Key → Zone.zone_id, INT, NOT NULL)
- **spot_number** (VARCHAR(10), NOT NULL)
- **spot_type** (ENUM: 'regular', 'compact', 'large', 'handicap', 'electric')
- **status** (ENUM: 'available', 'occupied', 'reserved', 'maintenance', DEFAULT: 'available')
- **created_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)
- **updated_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP ON UPDATE)

#### 4. Vehicle Entity
- **vehicle_id** (Primary Key, INT, Auto Increment)
- **owner_id** (Foreign Key → User.user_id, INT, NOT NULL)
- **license_plate** (VARCHAR(20), UNIQUE, NOT NULL)
- **make** (VARCHAR(50), NOT NULL)
- **model** (VARCHAR(50), NOT NULL)
- **year** (YEAR, NOT NULL)
- **color** (VARCHAR(30), NOT NULL)
- **vehicle_type** (ENUM: 'sedan', 'suv', 'truck', 'motorcycle', 'electric', 'hybrid', 'van')
- **size_category** (ENUM: 'compact', 'regular', 'large')
- **status** (ENUM: 'active', 'inactive', DEFAULT: 'active')
- **created_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)
- **updated_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP ON UPDATE)

#### 5. Reservation Entity
- **reservation_id** (Primary Key, INT, Auto Increment)
- **customer_id** (Foreign Key → User.user_id, INT, NOT NULL)
- **vehicle_id** (Foreign Key → Vehicle.vehicle_id, INT, NOT NULL)
- **spot_id** (Foreign Key → Spot.spot_id, INT, NOT NULL)
- **start_time** (DATETIME, NOT NULL)
- **end_time** (DATETIME, NOT NULL)
- **actual_start_time** (DATETIME)
- **actual_end_time** (DATETIME)
- **status** (ENUM: 'active', 'completed', 'cancelled', 'no-show', DEFAULT: 'active')
- **estimated_cost** (DECIMAL(10,2), NOT NULL)
- **actual_cost** (DECIMAL(10,2))
- **payment_status** (ENUM: 'pending', 'paid', 'refunded', DEFAULT: 'pending')
- **created_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)
- **updated_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP ON UPDATE)

#### 6. Payment Entity
- **payment_id** (Primary Key, INT, Auto Increment)
- **reservation_id** (Foreign Key → Reservation.reservation_id, INT, NOT NULL)
- **amount** (DECIMAL(10,2), NOT NULL)
- **payment_method** (ENUM: 'cash', 'credit_card', 'debit_card', 'mobile_payment')
- **payment_status** (ENUM: 'pending', 'completed', 'failed', 'refunded')
- **transaction_id** (VARCHAR(100))
- **payment_date** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)
- **created_at** (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)

### Relationships

1. **User → Vehicle** (One-to-Many)
   - One user can own multiple vehicles
   - Foreign Key: Vehicle.owner_id → User.user_id

2. **Zone → Spot** (One-to-Many)
   - One zone contains multiple parking spots
   - Foreign Key: Spot.zone_id → Zone.zone_id

3. **User → Reservation** (One-to-Many)
   - One customer can have multiple reservations
   - Foreign Key: Reservation.customer_id → User.user_id

4. **Vehicle → Reservation** (One-to-Many)
   - One vehicle can have multiple reservations (over time)
   - Foreign Key: Reservation.vehicle_id → Vehicle.vehicle_id

5. **Spot → Reservation** (One-to-Many)
   - One parking spot can have multiple reservations (over time)
   - Foreign Key: Reservation.spot_id → Spot.spot_id

6. **Reservation → Payment** (One-to-One)
   - Each reservation has one payment record
   - Foreign Key: Payment.reservation_id → Reservation.reservation_id

### Business Rules

1. A parking spot can only have one active reservation at any given time
2. A vehicle can only have one active reservation at any given time
3. Users with 'customer' type can make reservations
4. Users with 'admin' or 'staff' type can manage the system
5. Spots marked as 'maintenance' cannot be reserved
6. Zones marked as 'inactive' cannot accept new reservations
7. Vehicles marked as 'inactive' cannot make new reservations
8. Payment must be completed before reservation becomes active

### Indexes for Performance

```sql
-- Composite indexes for common queries
CREATE INDEX idx_reservation_status_time ON Reservation(status, start_time);
CREATE INDEX idx_spot_zone_status ON Spot(zone_id, status);
CREATE INDEX idx_vehicle_owner ON Vehicle(owner_id);
CREATE INDEX idx_reservation_customer ON Reservation(customer_id);
CREATE INDEX idx_payment_reservation ON Payment(reservation_id);
```

### Sample Queries

```sql
-- Find available spots in a specific zone
SELECT s.* FROM Spot s 
JOIN Zone z ON s.zone_id = z.zone_id 
WHERE z.zone_name = 'Zone A' AND s.status = 'available';

-- Get user's active reservations
SELECT r.*, s.spot_number, z.zone_name 
FROM Reservation r 
JOIN Spot s ON r.spot_id = s.spot_id 
JOIN Zone z ON s.zone_id = z.zone_id 
WHERE r.customer_id = ? AND r.status = 'active';

-- Calculate zone occupancy
SELECT z.zone_name, 
       COUNT(s.spot_id) as total_spots,
       SUM(CASE WHEN s.status = 'available' THEN 1 ELSE 0 END) as available_spots
FROM Zone z 
LEFT JOIN Spot s ON z.zone_id = s.zone_id 
GROUP BY z.zone_id;
```