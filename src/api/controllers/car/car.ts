import { Body, Get, JsonController, Post, Delete, Param, OnUndefined, Put, QueryParams, HttpCode } from "routing-controllers";

import { Car, CarModel } from "../../models";
const axios= require('axios');

const modelFields = {'Model Year': 'year', 'Make': 'make', 'Model': 'name'}

@JsonController("/cars")
export class CarController {
  @Get() //Get all cars with filter by query params {'year', 'make', 'name'}
  get(@QueryParams() params: any): Promise<Car[]> {
    let findOptions = null;
    if (Object.keys(params).length > 0) {
      const modelFieldsValues = Object.values(modelFields)
      for (let prop in params) {
          if (!modelFieldsValues.includes(prop)) delete params[prop]
      }
      findOptions = {
        where: {
          model: params,
        },
        relations: ["model"],
      }
    }
    return Car.find(findOptions)
  }

  @Get('/:id')
  @OnUndefined(404)
  getOne(@Param('id') id: string): Promise<Car> {
    return Car.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @OnUndefined(404)
  async create(@Body() body: Pick<Car, "licensePlate" | "registration" | "vin" | "model">): Promise<Car> {
    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${body.vin}?format=json`
    if (!body.vin || !body.licensePlate || !body.registration) return undefined
    try {
      const { data } = await axios.get(url);
      const modelData = data.Results.filter(row => Object.keys(modelFields).includes(row.Variable))
                            .map(e => {
                            return {[modelFields[e.Variable]]: e.Value}
                          })
      const modelJson : CarModel = Object.assign({}, ...modelData);
      if (modelJson.make == null || modelJson.year == null || modelJson.name == null) return undefined // check valid VIN

      let model = await CarModel.findOne({
        where: modelJson,
      })
      if (model == null) model = await CarModel.create(modelJson).save();
      body.model = model
      return Car.create(body).save();


    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      } else {
        console.log(error)
      }
    }
    return undefined;
  }

  @Put("/:id")
  @OnUndefined(404)
  async update(@Param('id') id: string, @Body() body: Car): Promise<Car> {
    let car = await Car.findOne(id)
    if (car == null) return undefined

    car = Object.assign(car, body);
    return car.save();
  }

  @Delete('/:id')
  @OnUndefined(404)
  async remove(@Param('id') id: string): Promise<Car>{
    let car = await Car.findOne(id)
    // return car.remove();
    if (car == null) return undefined
    return car.softRemove();
  }

}