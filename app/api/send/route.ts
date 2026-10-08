import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa o Resend com a chave que vamos por no .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validação simples
    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Rumu Studio <send@rumustudio.pt>', // Use o subdomínio configurado (send ou bounces)
      to: ['u9233301471@gmail.com'], // O email onde VOCÊ quer receber os contactos
      replyTo: email as string,
      subject: `Novo contacto do site: ${name}`,
      html: `
        <h1>Novo pedido de contacto</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
          ${message}
        </blockquote>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}