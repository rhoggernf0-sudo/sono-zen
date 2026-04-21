
import { NextResponse } from 'next/server';

/**
 * Endpoint para receber Webhooks de plataformas de pagamento.
 * Este arquivo serve como base para processar vendas, abandonos de carrinho e reembolsos.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Log para você ver os dados chegando no console durante o desenvolvimento
    console.log('Webhook recebido:', payload);

    // Exemplo de lógica para processar os status comuns:
    // 1. 'approved' ou 'paid' -> Liberar acesso no Firestore (UserProfile.hasAccess = true)
    // 2. 'abandoned' -> Registrar lead para recuperação de vendas
    // 3. 'refunded' -> Bloquear acesso

    return NextResponse.json({ 
      received: true, 
      status: 'success',
      message: 'Webhook processado com sucesso' 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json({ 
      received: false, 
      error: 'Formato de payload inválido' 
    }, { status: 400 });
  }
}

/**
 * Algumas plataformas exigem um GET para validação de URL.
 */
export async function GET() {
  return NextResponse.json({ message: 'Webhook endpoint ativo. Use POST para enviar dados.' });
}
