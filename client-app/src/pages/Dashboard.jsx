import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/axios';

export default function Dashboard() {
    const { user } = useAuth();
    const [policies, setPolicies] = useState([]);
    const [claims, setClaims] = useState([]);
    // Form states
    const [newPolicy, setNewPolicy] = useState({ policyName: '', policyType: 'Health', premiumAmount: 0, coverageAmount: 0 });
    const [newClaim, setNewClaim] = useState({ policyId: '', claimAmount: 0, reason: '' });

    useEffect(() => {
        fetchPolicies();
        fetchClaims();
    }, []);

    const fetchPolicies = async () => {
        try {
            const { data } = await api.get('/policies');
            setPolicies(data);
        } catch (err) { console.error(err); }
    };

    const fetchClaims = async () => {
        try {
            const { data } = await api.get('/claims');
            setClaims(data);
        } catch (err) { console.error(err); }
    };

    const createPolicy = async (e) => {
        e.preventDefault();
        try {
            await api.post('/policies', newPolicy);
            fetchPolicies();
            setNewPolicy({ policyName: '', policyType: 'Health', premiumAmount: 0, coverageAmount: 0 });
        } catch (err) { alert('Failed to create policy'); }
    };

    const createClaim = async (e) => {
        e.preventDefault();
        try {
            await api.post('/claims', newClaim);
            fetchClaims();
            setNewClaim({ policyId: '', claimAmount: 0, reason: '' });
        } catch (err) { alert('Failed to create claim'); }
    };

    // Admin View
    if (user?.role === 'admin') {
        return (
            <div className="space-y-8">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">Manage Policies</h2>
                    <form onSubmit={createPolicy} className="grid grid-cols-2 gap-4 mb-4">
                        <input placeholder="Policy Name" className="border p-2" value={newPolicy.policyName} onChange={e => setNewPolicy({ ...newPolicy, policyName: e.target.value })} required />
                        <select className="border p-2" value={newPolicy.policyType} onChange={e => setNewPolicy({ ...newPolicy, policyType: e.target.value })}>
                            <option>Health</option><option>Life</option><option>Vehicle</option>
                        </select>
                        <input type="number" placeholder="Premium" className="border p-2" value={newPolicy.premiumAmount} onChange={e => setNewPolicy({ ...newPolicy, premiumAmount: Number(e.target.value) })} required />
                        <input type="number" placeholder="Coverage" className="border p-2" value={newPolicy.coverageAmount} onChange={e => setNewPolicy({ ...newPolicy, coverageAmount: Number(e.target.value) })} required />
                        <button className="col-span-2 bg-blue-600 text-white p-2 rounded">Create Policy</button>
                    </form>
                    <ul>
                        {policies.map(p => (
                            <li key={p._id} className="border-b py-2 flex justify-between">
                                <span>{p.policyName} ({p.policyType}) - ${p.premiumAmount}</span>
                                <span className="text-gray-500">ID: {p._id}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">All Claims</h2>
                    <ul>
                        {claims.map(c => (
                            <li key={c._id} className="border-b py-2">
                                User: {c.userId} | Amount: ${c.claimAmount} | Status: <span className={c.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}>{c.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    // User View
    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Available Policies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {policies.map(p => (
                        <div key={p._id} className="border p-4 rounded hover:shadow-lg transition">
                            <h3 className="font-bold">{p.policyName}</h3>
                            <p>{p.policyType}</p>
                            <p className="text-green-600 font-bold">${p.premiumAmount}/mo</p>
                            <button className="mt-2 text-blue-500 underline" onClick={() => setNewClaim({ ...newClaim, policyId: p._id })}>File Claim for this</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">My Claims</h2>

                <form onSubmit={createClaim} className="mb-4 bg-gray-50 p-4 rounded">
                    <h3 className="font-semibold mb-2">File a New Claim</h3>
                    <div className="grid gap-4">
                        <input placeholder="Policy ID" className="border p-2" value={newClaim.policyId} onChange={e => setNewClaim({ ...newClaim, policyId: e.target.value })} required />
                        <input type="number" placeholder="Amount" className="border p-2" value={newClaim.claimAmount} onChange={e => setNewClaim({ ...newClaim, claimAmount: Number(e.target.value) })} required />
                        <input placeholder="Reason" className="border p-2" value={newClaim.reason} onChange={e => setNewClaim({ ...newClaim, reason: e.target.value })} required />
                        <button className="bg-green-600 text-white p-2 rounded">Submit Claim</button>
                    </div>
                </form>

                <ul>
                    {claims.map(c => (
                        <li key={c._id} className="border-b py-2 flex justify-between">
                            <span>{c.reason} (${c.claimAmount})</span>
                            <span>{c.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
