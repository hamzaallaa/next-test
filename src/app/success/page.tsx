export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#0f1629] to-[#1a1f3a] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-[#11172a] to-[#151d35] rounded-2xl shadow-2xl border border-[#1e2847] overflow-hidden">
          <div className="bg-gradient-to-r from-[#10b981] to-[#059669] p-1">
            <div className="bg-[#11172a] p-8">
              <div className="text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#e6ebff] mb-2">Paiement réussi</h2>
                  <p className="text-[#a8b2d1]">Merci ! Votre paiement a été confirmé en mode test.</p>
                </div>

                <div className="bg-gradient-to-r from-[#10b981]/10 to-[#059669]/10 border border-[#10b981]/20 rounded-xl p-6">
                  <div className="flex items-center justify-center gap-2 text-[#10b981]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Transaction confirmée</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a 
                    href="/" 
                    className="inline-block w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#667eea]/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Retour à l'accueil
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}