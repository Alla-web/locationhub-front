import { NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();

    const { data } = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);

  } catch (error) {
    const err = error as ApiError;

    return NextResponse.json(
      {
        error:
          err.response?.data?.error ??
          err.message ??
          'Something went wrong',
      },
      {
        status: err.status ?? 500,
      }
    );
  }
}