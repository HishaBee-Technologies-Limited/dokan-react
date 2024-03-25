'use server';

import { authApi } from '@/lib/api';

export const getAreasAndTypes = async () => {
  try {
    const areas = await authApi.get('/area/all');
    const types = await authApi.get('/shop/types');

    const areaData = await areas.json();
    const typesData = await types.json();

    if (areas?.ok && types?.ok) {
      return {
        success: true,
        status: areaData?.code,
        data: { areaData, typesData },
      };
    }
    if (!areas?.ok || !types?.ok) {
      return { success: false, error: { areaData, typesData } };
    }
  } catch (error) {
    return { success: false, error: 'Something went wrong' };
  }
};
