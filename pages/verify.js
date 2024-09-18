import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loader, CheckCircle, XCircle, Info } from 'lucide-react';

export default function PaymentVerificationPage() {
    const [userData, setUserData] = useState(null);
    const [updatedUserData, setUpdatedUserData] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reference, setReference] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('osunUserData');
        const reference = localStorage.getItem('reference');
        setReference(reference);
        if (!user) {
            setUserData(null);
            return;
        }

        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
    }, []);

    useEffect(() => {
        if (updatedUserData) {
            localStorage.setItem('osunUserData', JSON.stringify(updatedUserData));
        }
    }, [updatedUserData]);

    const handleVerifyPayment = async () => {
        if (!userData || !userData.email) {
            console.error('User data is not available');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/backed/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reference, customer_details: userData }),
            });

            const result = await response.json();

            if (result.success) {
                console.log(result.user);
                setUpdatedUserData(result.user);
                setVerificationStatus({ message: 'Payment verification successful.', status: 'success' });
            } else {
                setVerificationStatus({ message: `Verification failed: ${result.message}`, status: 'failed' });
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            setVerificationStatus({ message: 'An error occurred during payment verification.', status: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const renderVerificationStatus = () => {
        if (!verificationStatus) return null;

        let icon;
        let colorClass;

        switch (verificationStatus.status) {
            case 'success':
                icon = <CheckCircle className="text-green-600" size={36} />;
                colorClass = 'text-green-600';
                break;
            case 'failed':
                icon = <XCircle className="text-red-600" size={36} />;
                colorClass = 'text-red-600';
                break;
            case 'error':
                icon = <Info className="text-yellow-600" size={36} />;
                colorClass = 'text-yellow-600';
                break;
            default:
                icon = <Info className="text-gray-600" size={36} />;
                colorClass = 'text-gray-600';
        }

        return (
            <div className={`flex items-center justify-center w-full mt-6 ${colorClass}`}>
                {icon}
                <p className="ml-3 text-lg font-semibold">{verificationStatus.message}</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen w-full p-4 flex flex-col items-center justify-center lg:px-20 bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center mb-8 w-full max-w-4xl">
                <h1 className="text-3xl font-semibold mb-4">Payment Verification</h1>
                <p className="text-lg text-gray-600 mb-6">Verify your payment status below.</p>
                {renderVerificationStatus()}
                <div className="flex gap-4 items-center justify-center mt-6">
                    <button
                        onClick={handleVerifyPayment}
                        className={`px-4 py-2 rounded-md text-white flex items-center justify-center ${
                            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader className="animate-spin mr-2" size={20} />
                        ) : (
                            <span>Verify Payment</span>
                        )}
                    </button>
                    <button
                        onClick={() => router.push('/profile/profile')}
                        className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
                    >
                        Back to Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
