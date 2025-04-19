import {
  getCourses,
  findMeter,
  addMeter,
  updateMeter,
  deleteMeter,
} from "@/route/course";
import { Address } from "@/types";
import {
  useFetchData,
  useFindData,
  useSaveData,
  useDeleteData,
} from "./use-generic";
import { addAddress, updateAddress } from "@/route/address/address";
import { useStorage } from "./use-storage";

export function useFetchMeters() {
  const { identityUserId, projectId, token } = useStorage();
  return useFetchData(
    ["meters"],
    async () => await getMeters(identityUserId, projectId, token)
  );
}

export function useFindMeter(id: string) {
  const { identityUserId, projectId, token } = useStorage();

  return useFindData(
    ["meter", id],
    async () => findMeter(id, identityUserId, projectId, token),
    !!id
  );
}

export function useSaveMeter() {
  const { identityUserId, projectId, token } = useStorage();

  return useSaveData(
    async ({ meter, address }: { meter: any; address: Address }) => {
      const meterData = {
        code: meter.code,
        name: meter.name,
        model: meter.model,
        serial: meter.serial,
        accuracy: meter.accuracy,
        instalationDate: meter.instalationDate,
        initialReading: meter.initialReading,
        state: meter.state,
        meterTypeId: meter.meterType.id,
        consumerTypeId: meter.consumerType?.id,
        identityUserId,
        projectId,
      };

      const addressData = {
        id: address.id,
        street: address.street,
        postalCode: address.postalCode,
        exteriorNumber: address.exteriorNumber,
        interiorNumber: address.interiorNumber,
        additionalDetails: address.additionalDetails,
        countryId: address.country?.id,
        regionId: address.region?.id,
        districtId: address.district?.id,
        cityId: address.city?.id,
        neighborhoodId: address.neighborhood?.id,
        identityUserId,
      };

      if (meter.id) {
        const updatedMeter = {
          id: meter.id,
          ...meterData,
        };

        await updateMeter(updatedMeter, token);
        await updateAddress(addressData, token);
      } else {
        const addressId = await addAddress(addressData, token);
        const savedMeter = {
          addressId,
          ...meterData,
        };

        await addMeter(savedMeter, token);
      }
    },
    ["meters"],
    "Medidor guardado exitosamente",
    "Error al guardar el Medidor",
    "/meter"
  );
}

export function useDeleteMeter() {
  const { identityUserId, projectId, token } = useStorage();

  return useDeleteData(
    async ({ id }: { id: string }) =>
      await deleteMeter(id, identityUserId, projectId, token),
    ["meters"],
    "Medidor eliminado exitosamente",
    "Error al eliminar el Medidor"
  );
}
