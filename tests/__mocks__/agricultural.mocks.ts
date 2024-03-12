// @ts-nocheck
import "reflect-metadata";
import { ClassValidator } from "../../src";

@ClassValidator
export class AgricultureProduct {
  public harvestDate: Date;
  public saleDate: Date;
  public weight: number;
  public qualityRating: number;
  public packagingType: string;
  public temperatureStorage: number;
  public organicCertified: boolean;
  public countryOfOrigin: string;
  public pesticideFree: boolean;
  public gmoFree: boolean;

  constructor(
    harvestDate: Date,
    saleDate: Date,
    weight: number,
    qualityRating: number,
    packagingType: string,
    temperatureStorage: number,
    organicCertified: boolean,
    countryOfOrigin: string,
    pesticideFree: boolean,
    gmoFree: boolean
  ) {
    this.harvestDate = harvestDate;
    this.saleDate = saleDate;
    this.weight = weight;
    this.qualityRating = qualityRating;
    this.packagingType = packagingType;
    this.temperatureStorage = temperatureStorage;
    this.organicCertified = organicCertified;
    this.countryOfOrigin = countryOfOrigin;
    this.pesticideFree = pesticideFree;
    this.gmoFree = gmoFree;
  }
}
