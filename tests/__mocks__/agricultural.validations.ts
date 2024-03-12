// @ts-nocheck
import "reflect-metadata";
import { Dependency } from "../../src";
import { AgricultureProduct } from "./agricultural.mocks";

export const execValidations = () => {
  Dependency({
    name: "SaleDateAfterHarvestDate",
    getDependencies: (instance: AgricultureProduct) => ({ harvestDate: instance.harvestDate }),
    validate: (saleDate, { harvestDate }) => saleDate >= harvestDate,
    message: "The sale date cannot be before the harvest date.",
  })(AgricultureProduct.prototype, "saleDate");

  Dependency({
    name: "MinimumWeight",
    getDependencies: () => ({}), // No external dependencies for this case
    validate: (weight) => weight >= 5,
    message: "The product weight must be at least 5 kg.",
  })(AgricultureProduct.prototype, "weight");

  Dependency({
    name: "QualityRating",
    getDependencies: () => ({}), // No external dependencies for this case
    validate: (qualityRating) => qualityRating >= 3,
    message: "The quality rating must be at least 3.",
  })(AgricultureProduct.prototype, "qualityRating");

  Dependency({
    name: "ValidPackagingType",
    getDependencies: () => ({}), // No external dependencies for this case
    validate: (packagingType) => ["Bolsa", "Caja", "Granel"].includes(packagingType),
    message: "The packaging type must be either 'Bolsa', 'Caja', or 'Granel'.",
  })(AgricultureProduct.prototype, "packagingType");

  Dependency({
    name: "TemperatureStorageValidation",
    getDependencies: (instance) => ({ packagingType: instance.packagingType }),
    validate: (temperatureStorage, { packagingType }) => {
        if (packagingType === "Bolsa") return temperatureStorage >= 2 && temperatureStorage <= 6;
        if (packagingType === "Caja") return temperatureStorage >= 0 && temperatureStorage <= 4;
        if (packagingType === "Granel") return temperatureStorage >= 4 && temperatureStorage <= 8;
        return false; // If the packaging type is not known, validation fails
    },
    message: "Incorrect storage temperature for the given packaging type.",
  })(AgricultureProduct.prototype, "temperatureStorage");

  Dependency({
    name: "OrganicCertificationRequiredByCountry",
    getDependencies: (instance) => ({ countryOfOrigin: instance.countryOfOrigin }),
    validate: (organicCertified, { countryOfOrigin }) => {
        if (countryOfOrigin === "Alemania") return organicCertified;
        return true;
    },
    message: "Products from Germany must be certified organic.",
  })(AgricultureProduct.prototype, "organicCertified");
};