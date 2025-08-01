import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Shortly',
  description: 'Privacy Policy for Shortly URL shortening service',
};

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>

      <div className="max-w-none">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
          <p className="mb-4">
            Welcome to Shortly ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you understand how
            we collect, use, and safeguard your information when you use our URL shortening service.
          </p>
          <p>
            This Privacy Policy explains our practices regarding the collection, use, and protection of your personal information.
            By using our service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
          <p className="mb-4">We collect the following types of information:</p>

          <h3 className="mb-3 text-xl font-medium">Personal Information</h3>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Email Address:</strong> When you create an account, we collect your email address for authentication and
              account management purposes.
            </li>
          </ul>

          <h3 className="mb-3 text-xl font-medium">Automatically Collected Information</h3>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Usage Data:</strong> We may collect information about how you use our service, including the URLs you
              shorten.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect for the following purposes:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Account Management:</strong> To create and manage your account and authenticate your identity.
            </li>
            <li>
              <strong>Communication:</strong> To send you important service-related communications, such as account verification
              emails.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Data Sharing and Third Parties</h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties for marketing or commercial
            purposes. We have no third-party affiliations.
          </p>
          <p className="mb-4">We may share your information only in the following limited circumstances:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Service Providers:</strong> We may share information with trusted service providers who assist us in
              operating our service (such as our authentication provider, Clerk).
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal
              requests.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or
            electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Data Retention</h2>
          <p className="mb-4">
            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined
            in this Privacy Policy. If you delete your account, we will delete your personal information in accordance with our
            data retention policies (immediately).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Access:</strong> You can request access to the personal information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.
            </li>
            <li>
              <strong>Deletion:</strong> You can request that we delete your personal information.
            </li>
            <li>
              <strong>Portability:</strong> You can request a copy of your personal information in a portable format.
            </li>
          </ul>

          <p className="mt-4">To exercise these rights, please contact us using the information provided below.</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>

          <p>
            <strong>Email:</strong> <a href="mailto:ap.freelance26@gmail.com">ap.freelance26@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
