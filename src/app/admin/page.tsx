import React from 'react';
import { prisma } from "@/lib/prisma";
import { DollarSign, TrendingUp, Users, CreditCard } from 'lucide-react';

export default async function AdminPage() {
  const payments = await prisma.payment.findMany({
    take: 50,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Admin</h1>
          <p className="text-slate-600">Gestion des paiements et statistiques</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-600 text-sm font-medium">Total Revenus</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{(totalAmount / 100).toFixed(2)} €</p>
            <p className="text-xs text-slate-500 mt-1">{totalAmount} centimes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-600 text-sm font-medium">Transactions</h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{payments.length}</p>
            <p className="text-xs text-slate-500 mt-1">50 dernières</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-600 text-sm font-medium">Ticket Moyen</h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">
              {payments.length > 0 ? (totalAmount / payments.length / 100).toFixed(2) : '0.00'} €
            </p>
            <p className="text-xs text-slate-500 mt-1">Par transaction</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-600 text-sm font-medium">Clients</h3>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">
              {new Set(payments.map(p => p.customerEmail).filter(Boolean)).size}
            </p>
            <p className="text-xs text-slate-500 mt-1">Uniques</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Historique des paiements</h2>
          </div>

          {payments.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-500">Aucun paiement enregistré.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Montant</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Devise</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Statut</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Session ID</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-sm text-slate-700">
                        {formatDate(payment.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-slate-800">
                        {(payment.amount / 100).toFixed(2)} €
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 uppercase">
                        {payment.currency}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500 font-mono">
                        {payment.stripeSessionId}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-700">
                        {payment.customerEmail || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}