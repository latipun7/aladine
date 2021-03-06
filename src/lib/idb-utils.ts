import { openDB } from 'idb';
import type { DBSchema, StoreNames, StoreValue } from 'idb';
import type { Restaurant } from 'lib/restaurant-api';

interface AladineDB extends DBSchema {
  favorite: {
    key: string;
    value: Restaurant;
    indexes: { 'by-name': string };
  };
  keyval: {
    key: string;
    value: string;
  };
}

function handleError(error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error('Sorry, something went wrong.');
}

async function openDBStore() {
  try {
    return await openDB<AladineDB>('aladine-db', 1, {
      upgrade(db) {
        const store = db.createObjectStore('favorite', {
          keyPath: 'id',
        });

        store.createIndex('by-name', 'name', { unique: false });

        db.createObjectStore('keyval');
      },
    });
  } catch (error) {
    throw handleError(error);
  }
}

export async function addOrUpdateToStore(
  store: 'keyval',
  data: StoreValue<AladineDB, typeof store>,
  key: string
): Promise<string>;
export async function addOrUpdateToStore(
  store: Exclude<StoreNames<AladineDB>, 'keyval'>,
  data: StoreValue<AladineDB, typeof store>
): Promise<string>;
export async function addOrUpdateToStore(
  store: StoreNames<AladineDB>,
  data: StoreValue<AladineDB, typeof store>,
  key?: string
) {
  try {
    const db = await openDBStore();
    const tx = db.transaction(store, 'readwrite');

    return await tx.store.put(data, key);
  } catch (error) {
    throw handleError(error);
  }
}

export async function getAllFromStore(store: 'keyval'): Promise<string[]>;
export async function getAllFromStore(
  store: Exclude<StoreNames<AladineDB>, 'keyval'>
): Promise<Restaurant[]>;
export async function getAllFromStore(store: StoreNames<AladineDB>) {
  try {
    const db = await openDBStore();

    if (store === 'favorite') {
      return await db.getAllFromIndex(store, 'by-name');
    }

    return await db.getAll(store);
  } catch (error) {
    throw handleError(error);
  }
}

export async function getOneFromStore(
  store: 'keyval',
  key: string
): Promise<string | undefined>;
export async function getOneFromStore(
  store: Exclude<StoreNames<AladineDB>, 'keyval'>,
  key: string
): Promise<Restaurant | undefined>;
export async function getOneFromStore(
  store: StoreNames<AladineDB>,
  key: string
) {
  try {
    const db = await openDBStore();

    return await db.get(store, key);
  } catch (error) {
    throw handleError(error);
  }
}

export async function deleteFromStore(
  store: StoreNames<AladineDB>,
  key: string
) {
  try {
    const db = await openDBStore();
    const tx = db.transaction(store, 'readwrite');

    return await tx.store.delete(key);
  } catch (error) {
    throw handleError(error);
  }
}

export async function clearStore(store: StoreNames<AladineDB>) {
  try {
    const db = await openDBStore();
    const tx = db.transaction(store, 'readwrite');

    return await tx.store.clear();
  } catch (error) {
    throw handleError(error);
  }
}
