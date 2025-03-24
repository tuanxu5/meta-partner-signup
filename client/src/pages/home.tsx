import { MetaLogo } from "@/components/meta-logo";
import { RegistrationForm } from "@/components/registration-form";

export default function Home() {
  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans text-[#1c1e21]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <MetaLogo />
            <div className="ml-3">
              <h1 className="text-xl font-semibold">Meta Business Partner</h1>
              <p className="text-[#65676b] text-sm">Registration Portal</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <a href="#" className="text-[#1877F2] hover:underline text-sm">Learn more about Meta Partner Program</a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#1c1e21] sm:text-3xl mb-4">Become a Meta Business Partner</h2>
          <p className="max-w-2xl mx-auto text-[#65676b]">
            Join our exclusive network of businesses that help advertisers and companies succeed on Meta platforms.
            Complete the registration form below to get started.
          </p>
        </section>

        {/* Registration Form */}
        <RegistrationForm />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-[#65676b] hover:text-[#1c1e21] text-sm">About</a>
              <a href="#" className="text-[#65676b] hover:text-[#1c1e21] text-sm">Help Center</a>
              <a href="#" className="text-[#65676b] hover:text-[#1c1e21] text-sm">Privacy</a>
              <a href="#" className="text-[#65676b] hover:text-[#1c1e21] text-sm">Terms</a>
            </div>
            <p className="mt-4 text-center md:mt-0 md:text-right text-sm text-[#65676b]">
              &copy; {new Date().getFullYear()} Meta. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
