import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#0f1629] to-[#1a1f3a] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-[#11172a] to-[#151d35] rounded-2xl shadow-2xl border border-[#1e2847] overflow-hidden">
          <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-1">
            <div className="bg-[#11172a] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#e6ebff]">Pack Visionyze</h2>
                  <p className="text-sm text-[#8892b0]">Produit numérique premium</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[#a8b2d1] leading-relaxed">
                  Accédez à un contenu premium (fictif) après paiement Stripe (mode test).
                </p>

                <div className="bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 border border-[#667eea]/20 rounded-xl p-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                      19.99
                    </span>
                    <span className="text-2xl text-[#8892b0]">€</span>
                  </div>
                  <p className="text-sm text-[#8892b0] mt-2">Paiement unique</p>
                </div>

                <form action="/api/checkout" method="POST" className="space-y-4">
                  <button 
                    className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-[#667eea]/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
                    type="submit"
                  >
                    Acheter maintenant
                  </button>
                </form>

                <div className="bg-[#1a2235] border border-[#2a3650] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#667eea] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-[#8892b0]">
                      <p className="font-medium text-[#a8b2d1] mb-1">Mode test activé</p>
                      <p>Utilisez les cartes de test Stripe (ex: 4242 4242 4242 4242)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            className="inline-flex items-center gap-2 text-[#667eea] hover:text-[#764ba2] transition-colors font-medium" 
            href="/admin"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Aller au dashboard admin
          </Link>
        </div>
      </div>
    </div>
  );
}