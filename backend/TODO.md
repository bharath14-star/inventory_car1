# TODO: Implement Employee ID and Referral ID with Filtering

## Backend Changes
- [x] Update User model to add employeeId field (required, max 16 chars)
- [x] Update Car model to add referralId field (required, max 16 chars)
- [x] Modify authController.register to accept and validate employeeId
- [x] Modify carController.createCar to accept referralId
- [x] Update carController.getAllCars to filter records where car.referralId matches user.employeeId for non-admin users
- [x] Update carController.getStats to filter records for non-admin users

## Frontend Changes
- [x] Add employeeId field to Register.jsx form
- [x] Add referralId field to CarForm.jsx form

## Testing
- [ ] Test user registration with employee ID
- [ ] Test car entry with referral ID
- [ ] Verify filtering works for users (only see matching records)
- [ ] Confirm admin sees all records
