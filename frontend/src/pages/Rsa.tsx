export default function Rsa() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">RSA Encoder/Decoder</h1>
            <p className="text-lg mb-8">
                Encode or decode your text using RSA encryption.
            </p>
            <div className="w-full max-w-md">
                <textarea
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg mb-4"
                    placeholder="Enter text to encode/decode"
                ></textarea>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                    Encode
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Decode
                </button>
            </div>
        </div>
    );
}