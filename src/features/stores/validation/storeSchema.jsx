import * as Yup from "yup";

export const storeSchema = Yup.object({
  store_name: Yup.string().required("Store name is required."),
  web_address: Yup.string().url("Must be a valid URL.").nullable(),
  physical_address: Yup.string().nullable(),
  latitude: Yup.number().nullable(),
  longitude: Yup.number().nullable(),
});

export default storeSchema;
