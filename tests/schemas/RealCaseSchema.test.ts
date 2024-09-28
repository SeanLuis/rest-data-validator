import { SchemaValidator } from '../../src';

it('should validate a complex agricultural traceability record', () => {
  // Define the schemas
  
  // Schema for farm information
  const farmSchema = SchemaValidator.object({
    name: SchemaValidator.string().required(),
    location: SchemaValidator.string().required(),
    farmId: SchemaValidator.number().required(),
  });

  // Schema for each batch of produce
  const batchSchema = SchemaValidator.object({
    batchId: SchemaValidator.string().required(),
    produceType: SchemaValidator.string().required(),
    quantity: SchemaValidator.number().min(1).required(),
    harvestDate: SchemaValidator.date().required(),
  });

  // Schema for a processing event
  const processingEventSchema = SchemaValidator.object({
    eventId: SchemaValidator.string().required(),
    eventType: SchemaValidator.enum(['Cleaning', 'Sorting', 'Packaging']),
    timestamp: SchemaValidator.date().required(),
    operator: SchemaValidator.string().required(),
  });

  // Schema for a transportation record
  const transportationSchema = SchemaValidator.object({
    transportId: SchemaValidator.string().required(),
    vehicleType: SchemaValidator.enum(['Truck', 'Van', 'Drone']).required(),
    startDate: SchemaValidator.date().required(),
    endDate: SchemaValidator.date().required(),
    driver: SchemaValidator.string().required(),
  });

  // Schema for delivery information
  const deliverySchema = SchemaValidator.object({
    deliveryId: SchemaValidator.string().required(),
    destination: SchemaValidator.string().required(),
    deliveredBy: SchemaValidator.string().required(),
    deliveryDate: SchemaValidator.date().required(),
  });

  // Traceability record schema (combining all above)
  const traceabilityRecordSchema = SchemaValidator.object({
    farm: farmSchema.required(),
    produceBatch: batchSchema.required(),
    processingEvents: SchemaValidator.array(processingEventSchema).min(1).required(),
    transportation: SchemaValidator.union([
      SchemaValidator.array(transportationSchema), 
      SchemaValidator.nullable(SchemaValidator.array(transportationSchema))
    ]),
    delivery: deliverySchema.required(),
  });

  // Define a valid traceability record
  const validRecord = {
    farm: {
      name: 'Green Farm',
      location: 'Valley Rd, Farmville',
      farmId: 101,
    },
    produceBatch: {
      batchId: 'BATCH-001',
      produceType: 'Apples',
      quantity: 500,
      harvestDate: new Date('2023-09-01'),
    },
    processingEvents: [
      {
        eventId: 'EVT-001',
        eventType: 'Cleaning',
        timestamp: new Date('2023-09-02'),
        operator: 'John Doe',
      },
      {
        eventId: 'EVT-002',
        eventType: 'Sorting',
        timestamp: new Date('2023-09-03'),
        operator: 'Jane Doe',
      },
    ],
    transportation: [
      {
        transportId: 'TRANS-001',
        vehicleType: 'Truck',
        startDate: new Date('2023-09-04'),
        endDate: new Date('2023-09-05'),
        driver: 'Sam Smith',
      },
    ],
    delivery: {
      deliveryId: 'DEL-001',
      destination: 'Market St, Cityville',
      deliveredBy: 'Express Logistics',
      deliveryDate: new Date('2023-09-06'),
    },
  };

  // Validate the record
  const validationResult = traceabilityRecordSchema.validate(validRecord);

  // Assert the result
  expect(validationResult.isValid).toBe(true);
  expect(validationResult.errors).toHaveLength(0);

  // Create an invalid record (missing fields, wrong types, etc.)
  const invalidRecord = {
    farm: {
      name: 'Green Farm',
      location: 'Valley Rd, Farmville',
      // farmId is missing
    },
    produceBatch: {
      batchId: 'BATCH-001',
      produceType: 'Apples',
      quantity: 0, // Invalid quantity
      // harvestDate is missing
    },
    processingEvents: [],
    transportation: null, // Valid case, since transportation can be nullable
    delivery: {
      deliveryId: 'DEL-001',
      destination: 'Market St, Cityville',
      // deliveredBy is missing
      deliveryDate: new Date('2023-09-06'),
    },
  };

  // Validate the invalid record
  const invalidResult = traceabilityRecordSchema.validate(invalidRecord);

  // Assert the invalid case
  expect(invalidResult.isValid).toBe(false);
  expect(invalidResult.errors).toContain("Validation failed for property 'processingEvents': Array is too short. Minimum length is 1.");
  expect(invalidResult.errors).toContain("Validation failed for property 'farm': Validation failed for property 'farmId': Property is missing.");
  expect(invalidResult.errors).toContain("Validation failed for property 'produceBatch': Validation failed for property 'quantity': Number is too small. Minimum value is 1.");
  expect(invalidResult.errors).toContain("Validation failed for property 'produceBatch': Validation failed for property 'harvestDate': Property is missing.");
  expect(invalidResult.errors).toContain("Validation failed for property 'delivery': Validation failed for property 'deliveredBy': Property is missing.");
});

it('should validate a deeply nested agricultural traceability record with multiple levels', () => {
  // Define the schemas

  // Schema for farm information
  const farmSchema = SchemaValidator.object({
    name: SchemaValidator.string().required(),
    location: SchemaValidator.string().required(),
    farmId: SchemaValidator.number().required(),
    owner: SchemaValidator.object({
      ownerId: SchemaValidator.string().required(),
      name: SchemaValidator.string().required(),
      contactDetails: SchemaValidator.object({
        phone: SchemaValidator.string().required(),
        email: SchemaValidator.string().required(),
        address: SchemaValidator.string().required(),
      }).required(),
    }).required(),
  });

  // Schema for each batch of produce
  const batchSchema = SchemaValidator.object({
    batchId: SchemaValidator.string().required(),
    produceType: SchemaValidator.string().required(),
    quantity: SchemaValidator.number().min(1).required(),
    harvestDate: SchemaValidator.date().required(),
    certifications: SchemaValidator.array(
      SchemaValidator.object({
        certificationId: SchemaValidator.string().required(),
        certificationBody: SchemaValidator.string().required(),
        expiryDate: SchemaValidator.date().required(),
      })
    ).required(),
  });

  // Schema for a processing event
  const processingEventSchema = SchemaValidator.object({
    eventId: SchemaValidator.string().required(),
    eventType: SchemaValidator.enum(['Cleaning', 'Sorting', 'Packaging']).required(),
    timestamp: SchemaValidator.date().required(),
    operator: SchemaValidator.object({
      operatorId: SchemaValidator.string().required(),
      name: SchemaValidator.string().required(),
      role: SchemaValidator.string().required(),
    }).required(),
  });

  // Schema for a transportation record
  const transportationSchema = SchemaValidator.object({
    transportId: SchemaValidator.string().required(),
    vehicleType: SchemaValidator.enum(['Truck', 'Van', 'Drone']).required(),
    startDate: SchemaValidator.date().required(),
    endDate: SchemaValidator.date().required(),
    driver: SchemaValidator.object({
      driverId: SchemaValidator.string().required(),
      name: SchemaValidator.string().required(),
      licenseNumber: SchemaValidator.string().required(),
    }).required(),
  });

  // Schema for delivery information
  const deliverySchema = SchemaValidator.object({
    deliveryId: SchemaValidator.string().required(),
    destination: SchemaValidator.string().required(),
    deliveredBy: SchemaValidator.string().required(),
    deliveryDate: SchemaValidator.date().required(),
    receiver: SchemaValidator.object({
      receiverId: SchemaValidator.string().required(),
      name: SchemaValidator.string().required(),
      contact: SchemaValidator.object({
        phone: SchemaValidator.string().required(),
        email: SchemaValidator.string().required(),
      }).required(),
    }).required(),
  });

  // Traceability record schema (combining all above)
  const traceabilityRecordSchema = SchemaValidator.object({
    farm: farmSchema.required(),
    produceBatch: batchSchema.required(),
    processingEvents: SchemaValidator.array(processingEventSchema).min(1).required(),
    transportation: SchemaValidator.union([
      SchemaValidator.array(transportationSchema), 
      SchemaValidator.nullable(SchemaValidator.array(transportationSchema))
    ]).required(),
    delivery: deliverySchema.required(),
  });

  // Define a valid deeply nested traceability record
  const validNestedRecord = {
    farm: {
      name: 'Green Farm',
      location: 'Valley Rd, Farmville',
      farmId: 101,
      owner: {
        ownerId: 'OWNER-001',
        name: 'John Doe',
        contactDetails: {
          phone: '123-456-7890',
          email: 'john@example.com',
          address: '123 Farm St, Farmville',
        },
      },
    },
    produceBatch: {
      batchId: 'BATCH-001',
      produceType: 'Apples',
      quantity: 500,
      harvestDate: new Date('2023-09-01'),
      certifications: [
        {
          certificationId: 'CERT-001',
          certificationBody: 'Organic Certification Body',
          expiryDate: new Date('2025-01-01'),
        },
      ],
    },
    processingEvents: [
      {
        eventId: 'EVT-001',
        eventType: 'Cleaning',
        timestamp: new Date('2023-09-02'),
        operator: {
          operatorId: 'OP-001',
          name: 'John Doe',
          role: 'Supervisor',
        },
      },
      {
        eventId: 'EVT-002',
        eventType: 'Sorting',
        timestamp: new Date('2023-09-03'),
        operator: {
          operatorId: 'OP-002',
          name: 'Jane Doe',
          role: 'Worker',
        },
      },
    ],
    transportation: [
      {
        transportId: 'TRANS-001',
        vehicleType: 'Truck',
        startDate: new Date('2023-09-04'),
        endDate: new Date('2023-09-05'),
        driver: {
          driverId: 'DRIVER-001',
          name: 'Sam Smith',
          licenseNumber: 'ABC-12345',
        },
      },
    ],
    delivery: {
      deliveryId: 'DEL-001',
      destination: 'Market St, Cityville',
      deliveredBy: 'Express Logistics',
      deliveryDate: new Date('2023-09-06'),
      receiver: {
        receiverId: 'REC-001',
        name: 'Buyer Co.',
        contact: {
          phone: '987-654-3210',
          email: 'buyer@example.com',
        },
      },
    },
  };

  // Validate the record
  const validationResult = traceabilityRecordSchema.validate(validNestedRecord);

  // Assert the result
  expect(validationResult.isValid).toBe(true);
  expect(validationResult.errors).toHaveLength(0);

  // Create an invalid deeply nested record (missing fields, wrong types, etc.)
  const invalidNestedRecord = {
    farm: {
      name: 'Green Farm',
      location: 'Valley Rd, Farmville',
      // farmId is missing
      owner: {
        ownerId: 'OWNER-001',
        name: 'John Doe',
        contactDetails: {
          // phone is missing
          email: 'john@example.com',
          address: '123 Farm St, Farmville',
        },
      },
    },
    produceBatch: {
      batchId: 'BATCH-001',
      produceType: 'Apples',
      quantity: 0, // Invalid quantity
      // harvestDate is missing
      certifications: [
        {
          certificationId: 'CERT-001',
          certificationBody: 'Organic Certification Body',
          expiryDate: 'invalid-date', // Invalid date format
        },
      ],
    },
    processingEvents: [],
    transportation: null, // Valid case, since transportation can be nullable
    delivery: {
      deliveryId: 'DEL-001',
      destination: 'Market St, Cityville',
      // deliveredBy is missing
      deliveryDate: new Date('2023-09-06'),
      receiver: {
        receiverId: 'REC-001',
        name: 'Buyer Co.',
        contact: {
          // email is missing
          phone: '987-654-3210',
        },
      },
    },
  };

  // Validate the invalid record
  const invalidResult = traceabilityRecordSchema.validate(invalidNestedRecord);

  // Assert the invalid case
  expect(invalidResult.isValid).toBe(false);
  expect(invalidResult.errors).toContain("Validation failed for property 'farm': Validation failed for property 'farmId': Property is missing.");
  expect(invalidResult.errors).toContain("Validation failed for property 'produceBatch': Validation failed for property 'quantity': Number is too small. Minimum value is 1.");
  expect(invalidResult.errors).toContain("Validation failed for property 'produceBatch': Validation failed for property 'harvestDate': Property is missing.");
  expect(invalidResult.errors).toContain("Validation failed for property 'produceBatch': Validation failed for property 'certifications': Error at index 0: Validation failed for property 'expiryDate': Value must be a valid date.");
  expect(invalidResult.errors).toContain("Validation failed for property 'delivery': Validation failed for property 'deliveredBy': Property is missing.");
  expect(invalidResult.errors).toContain("Validation failed for property 'delivery': Validation failed for property 'receiver': Validation failed for property 'contact': Validation failed for property 'email': Property is missing.");
});
