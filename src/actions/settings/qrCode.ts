'use server';

import { api } from '@/lib/api';

export const addQrCode = async (payload: any) => {
  try {
    const response = await api.post('/qr/add', payload);
    const data = await response.json();

    if (response.ok) {
      return { success: true, status: data.code, data: data };
    } else {
      return { success: false, status: data.code, error: data };
    }
  } catch (error) {
    return { success: false, error: 'Something went wrong!' };
  }
};
