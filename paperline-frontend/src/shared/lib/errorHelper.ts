export const getErrorMessage = (err: unknown): string => {
   const e = err as any;

   if (e?.errors && Array.isArray(e.errors) && e.errors.length > 0) {
      return e.errors[0].message;
   }

   if (e?.response?.data?.errors?.length > 0) {
      return e.response.data.errors[0].message;
   }

   return (
      e?.response?.data?.message ||
      e?.message ||
      "Something went wrong"
   );
};