import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, message, token } = await req.json();

  if (!name || !email || !message || !token) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=6Le4jTksAAAAAH-1z4aSSb_g-h2XGggy9n1Y_MLo&response=${token}`,
      {
        method: 'POST',
      }
    );

    const data = await response.json();

    if (data.success) {
      // Here you would typically send an email or save the contact information to a database
      console.log('reCAPTCHA verified successfully', { name, email, message });
      return NextResponse.json({ message: 'Message sent successfully!' });
    } else {
      return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
