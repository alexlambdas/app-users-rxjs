import Ajv from "ajv/dist/2020";
import { JSONSchemaType } from "ajv";
import { UserType } from "../types/User.type";

const OBJECT = 'object';
const STRING = 'string';
const INTEGER = 'integer';

const UserSchema: JSONSchemaType<UserType> = {
  type: OBJECT,
  required:['id','name','username','email','address','phone','website','company'],
  additionalProperties: false,
  properties:{
    id: {type: INTEGER},
    name: {type: STRING},
    username: {type: STRING},
    email: {type: STRING},
    address: {
      type: OBJECT, 
      required: ['street','suite','city','zipcode','geo'],
      additionalProperties: false,
      properties:{
        street: {type: STRING},
        suite: {type: STRING},
        city: {type: STRING},
        zipcode: {type: STRING},
        geo: {
          type: OBJECT, 
          required: ['lat','lng'],
          additionalProperties: false,
          properties:{
            lat: {type: STRING},
            lng: {type: STRING},
          }
        }
      }
    },
    phone: {type: STRING}, 
    website: {type: STRING},
    company: {
      type: OBJECT, 
      required: ['name','catchPharase','bs'],
      additionalProperties: false,
      properties:{
        name: {type: STRING},
        catchPharase: {type: STRING},
        bs: {type: STRING}
      }
    }
  }
};

const fnUserSchemaValidation = new Ajv().compile(UserSchema);

export { fnUserSchemaValidation }

