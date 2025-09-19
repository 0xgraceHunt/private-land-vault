import Header from '@/components/Header';
import VRLandGrid from '@/components/VRLandGrid';
import Footer from '@/components/Footer';

const Marketplace = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              VR Land <span className="holographic">Marketplace</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore and purchase virtual land in our encrypted marketplace. 
              All transactions are private until finalized, protecting against speculation.
            </p>
          </div>
        </div>
        <VRLandGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;