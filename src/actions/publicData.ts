'use server';

export const getDivisions = async () => {
  try {
    const divisionRes = await fetch(
      `${process.env.NEXT_PUBLIC_BDAPI_URL}/divisions`
    );
    const districtRes = await fetch(
      `${process.env.NEXT_PUBLIC_BDAPI_URL}/districts`
    );
    const division = await divisionRes.json();
    const district = await districtRes.json();
    if (divisionRes.ok && districtRes.ok) {
      return {
        success: true,
        status: division.code,
        data: { division, district },
      };
    }
    if (!divisionRes.ok && !districtRes.ok) {
      return { success: false, error: division };
    }
  } catch (err) {
    return {
      success: false,
      error: 'Something went wrong, Possible Network Error',
    };
  }
};
