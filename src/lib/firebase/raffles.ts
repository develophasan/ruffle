import { ref, remove, update } from 'firebase/database';
import { database } from '../firebase';

export const deleteRaffle = async (userId: string, raffleId: string) => {
  const raffleRef = ref(database, `raffles/${userId}/${raffleId}`);
  await remove(raffleRef);
};

export const updateRaffle = async (userId: string, raffleId: string, data: any) => {
  const raffleRef = ref(database, `raffles/${userId}/${raffleId}`);
  await update(raffleRef, data);
};