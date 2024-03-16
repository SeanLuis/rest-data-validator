// @ts-nocheck

import "reflect-metadata";
import { String, Number, Contextual, ClassValidator } from "../../src";
import { setGlobalContext, getGlobalContext, setContext, getContext, clearContext, clearAllContexts } from "../../src";

@ClassValidator
class SecureDocument {
  @Contextual({
    name: "UserRoleValidator",
    getContext: () => getContext("documentAccess"),
    validate: (value, context) => context.userRole === "admin",
    message: "User does not have admin role.",
  })
  @Contextual({
    name: "TimeValidator",
    getContext: () => getContext("documentAccess").time,
    validate: (value, context) =>
      new Date(context.currentTime) >= new Date(context.allowedStartTime) &&
      new Date(context.currentTime) <= new Date(context.allowedEndTime),
    message: "Access is not allowed at this time.",
  })
  @Contextual({
    name: "LocationValidator",
    getContext: () => getContext("documentAccess").location,
    validate: (value, context) => context.userLocation === context.allowedLocation,
    message: "Access from this location is not allowed.",
  })
  content: string;

  constructor(content: string) {
    this.content = content;
  }
}

describe("SecureDocument with Advanced Contextual Validation", () => {
  beforeEach(() => {
    // Setup initial context for document access
    setContext("documentAccess", {
      userRole: "admin",
      time: {
        currentTime: "2023-03-15T15:00:00Z",
        allowedStartTime: "2023-03-15T14:00:00Z",
        allowedEndTime: "2023-03-15T16:00:00Z",
      },
      location: {
        userLocation: "New York",
        allowedLocation: "New York",
      },
    });
  });

  afterEach(() => {
    // Clear contexts after each test
    clearAllContexts();
  });

  it("should allow access for admin role within allowed time and location", () => {
    expect(() => new SecureDocument("Top Secret Document")).not.toThrow();
  });

  it("should allow access for admin role within allowed time and location", () => {
    expect(() => new SecureDocument("Top Secret Document")).not.toThrow();
  });

  it("should deny access outside of allowed time", () => {
    const updatedContext = { ...getContext("documentAccess") };
    updatedContext.time.currentTime = "2023-03-15T17:00:00Z"; // Fuera del rango permitido
    setContext("documentAccess", updatedContext);

    expect(() => new SecureDocument("Top Secret Document")).toThrow("Access is not allowed at this time.");
  });

  it("should deny access from disallowed location", () => {
    const updatedContext = { ...getContext("documentAccess") };
    updatedContext.location.userLocation = "London"; // Ubicación no permitida
    setContext("documentAccess", updatedContext);

    expect(() => new SecureDocument("Top Secret Document")).toThrow("Access from this location is not allowed.");
  });
});

@ClassValidator
class CropBatch {
  @String({ minLength: 5, maxLength: 10 })
  batchId: string;

  @Contextual({
    name: "HarvestDateValidator",
    getContext: () => getContext("cropBatchContext"),
    validate: (value, context) =>
      new Date(value) <= new Date(context.currentDate) &&
      new Date(value) >= new Date(context.plantingDate),
    message: "Harvest date must be between planting date and current date.",
  })
  harvestDate: string;

  @Contextual({
    name: "PesticideUsageValidator",
    getContext: () => getContext("cropBatchContext"),
    validate: (value, context) =>
      context.allowedPesticides.includes(value),
    message: "Pesticide used is not allowed.",
  })
  pesticideUsed: string;

  @Contextual({
    name: "BatchQuantityValidator",
    getContext: () => getContext("cropBatchContext"),
    validate: (value, context) =>
      value > 0 && value <= context.maxBatchSize,
    message: "Batch size is out of the allowed range.",
  })
  batchQuantity: number;

  @Number({ min: 0, max: 1000 })
  @Contextual({
    name: "WaterUsageValidator",
    getContext: () => getContext("cropBatchContext"),
    validate: (value, context) =>
      context.cropsNeedingLessWater.includes(context.cropType) ? value <= context.lowerWaterLimit : value <= context.upperWaterLimit,
    message: "Water usage for this crop type is out of the allowed range.",
  })
  waterUsed: number;

  constructor(batchId: string, harvestDate: string, pesticideUsed: string, batchQuantity: number, waterUsed: number) {
    this.batchId = batchId;
    this.harvestDate = harvestDate;
    this.pesticideUsed = pesticideUsed;
    this.batchQuantity = batchQuantity;
    this.waterUsed = waterUsed;
  }
}

describe("CropBatch with Advanced Contextual and Standard Validation", () => {
  beforeEach(() => {
    setContext("cropBatchContext", {
      currentDate: "2023-08-01",
      plantingDate: "2023-03-01",
      allowedPesticides: ["PesticideA", "PesticideB"],
      maxBatchSize: 1000,
      cropsNeedingLessWater: ["Lettuce", "Spinach"],
      cropType: "Lettuce",
      lowerWaterLimit: 500,
      upperWaterLimit: 800,
    });
  });

  afterEach(() => {
    clearContext("cropBatchContext");
  });

  it("should allow an appropriate amount of water for crops needing less water", () => {
    expect(() => new CropBatch("Batch1", "2023-07-01", "PesticideA", 500, 300)).not.toThrow();
  });

  it("should deny too much water for crops needing less water", () => {
    expect(() => new CropBatch("Batch1", "2023-07-01", "PesticideA", 500, 600)).toThrow("Water usage for this crop type is out of the allowed range.");
  });

  it("should deny water usage exceeding the general maximum", () => {
    expect(() => new CropBatch("Batch1", "2023-07-01", "PesticideA", 500, 1200)).toThrow();
  });

  it("should allow a valid batch ID, harvest date, pesticide, and quantity", () => {
    expect(() => new CropBatch("Batch1", "2023-07-01", "PesticideA", 500, 300)).not.toThrow();
  });

  it("should deny a harvest date before planting", () => {
    expect(() => new CropBatch("Batch1", "2023-02-01", "PesticideA", 500, 300)).toThrow("Harvest date must be between planting date and current date.");
  });

  it("should deny usage of an unallowed pesticide", () => {
    expect(() => new CropBatch("Batch1", "2023-07-01", "PesticideC", 500, 300)).toThrow("Pesticide used is not allowed.");
  });

  it("should deny a batch quantity out of allowed range", () => {
    expect(() => new CropBatch("Batch1", "2023-07-01", "PesticideA", 1500, 300)).toThrow("Batch size is out of the allowed range.");
  });

  it("should deny an invalid batch ID length", () => {
    expect(() => new CropBatch("B", "2023-07-01", "PesticideA", 500, 300)).toThrow();
  });
});

@ClassValidator
class EthereumTransaction {
  @String({ min: 42, max: 42 }) // Ethereum address length validation (42 characters including '0x')
  fromAddress: string;

  @String({ min: 42, max: 42 }) // Ethereum address length validation
  toAddress: string;

  @Number({ min: 0 }) // Transferred value must be non-negative
  value: number; // Value in wei

  @Number({ min: 21000 }) // Minimum gas for a transaction
  gasLimit: number;

  @Number({ min: 1 }) // Minimum suggested gas price (in Gwei)
  gasPrice: number;

  @Contextual({
    name: "BlacklistValidator",
    getContext: () => getContext("securityContext"),
    validate: (value, context) => !context.blacklistedAddresses.includes(value),
    message: "Address is blacklisted.",
  })
  fromAddress: string;

  @Contextual({
    name: "DailyLimitValidator",
    getContext: () => getContext("financialContext"),
    validate: (value, context) => context.dailySpent + value <= context.dailyLimit,
    message: "Daily spending limit exceeded.",
  })
  value: number;

  constructor(fromAddress: string, toAddress: string, value: number, gasLimit: number, gasPrice: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.value = value;
    this.gasLimit = gasLimit;
    this.gasPrice = gasPrice;
  }
}

describe("EthereumTransaction Validation", () => {
  beforeEach(() => {
    setContext("securityContext", {
      blacklistedAddresses: ["0xBlacklist1", "0xBlacklist2"],
    });
    setContext("financialContext", {
      dailyLimit: 1000000000000000000, // 1 Ether daily in wei
      dailySpent: 0, // No spending recorded today yet
    });
  });

  afterEach(() => {
    clearAllContexts();
  });

  it("should allow a valid transaction not exceeding daily limit and not blacklisted", () => {
    expect(() => new EthereumTransaction(
      "0xValidFrom",
      "0xValidTo",
      500000000000000000, // 0.5 Ether in wei
      21000,
      50 // Gas Price in Gwei
    )).not.toThrow();
  });

  it("should deny a transaction from a blacklisted address", () => {
    expect(() => new EthereumTransaction(
      "0xBlacklist1",
      "0xValidTo",
      500000000000000000,
      21000,
      50
    )).toThrow("Address is blacklisted.");
  });

  it("should deny a transaction exceeding daily limit", () => {
    setContext("financialContext", {
      dailyLimit: 1000000000000000000,
      dailySpent: 900000000000000000, // 0.9 Ether in wei already spent today
    });

    expect(() => new EthereumTransaction(
      "0xValidFrom",
      "0xValidTo",
      200000000000000000, // Trying to transfer 0.2 Ether, which exceeds the daily limit
      21000,
      50
    )).toThrow("Daily spending limit exceeded.");
  });
});

describe("ContextProvider", () => {
  afterEach(() => {
    clearAllContexts();
  });

  it("should set and get the global context correctly", () => {
    const globalContext = { key: "value" };
    setGlobalContext(globalContext);

    const retrievedGlobalContext = getGlobalContext();
    expect(retrievedGlobalContext).toEqual(globalContext);
  });

  it("should return the global context when getting a non-existent context", () => {
    const globalContext = { key: "value" };
    setGlobalContext(globalContext);

    const retrievedContext = getContext("nonExistentContext");
    expect(retrievedContext).toEqual(globalContext);
  });

  it("should return the specific context when it exists", () => {
    const globalContext = { key: "value" };
    setGlobalContext(globalContext);

    const specificContext = { specificKey: "specificValue" };
    setContext("specificContext", specificContext);

    const retrievedContext = getContext("specificContext");
    expect(retrievedContext).toEqual(specificContext);
  });
});
