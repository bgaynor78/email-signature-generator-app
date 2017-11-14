export const GENERATE_SIGNATURE = 'GENERATE_SIGNATURE';

export function generateSignature(values) {

  return {
    type: GENERATE_SIGNATURE,
    payload: values
  }
}