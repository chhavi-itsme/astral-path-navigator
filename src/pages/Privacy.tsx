
import React from 'react';
import { Shield, Eye, Lock, UserCheck, Mail, Calendar } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="cosmic-container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold cosmic-title mb-4 flex items-center justify-center">
              <Shield className="mr-3 h-8 w-8" />
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: May 15, 2025
            </p>
          </div>

          <div className="space-y-8">
            <section className="cosmic-card p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We collect information you provide directly to us, such as when you use our Saturn Return calculator or contact us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Birth date and time (for Saturn Return calculations)</li>
                  <li>Email address (if you contact us)</li>
                  <li>Any other information you choose to provide</li>
                </ul>
                <p>
                  We also automatically collect certain information when you visit our website:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address (anonymized)</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website</li>
                </ul>
              </div>
            </section>

            <section className="cosmic-card p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <UserCheck className="mr-2 h-5 w-5" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and improve our Saturn Return calculator service</li>
                  <li>Calculate accurate Saturn Return dates based on your birth information</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze website usage to improve user experience</li>
                  <li>Ensure the security and proper functioning of our website</li>
                </ul>
                <p className="font-medium text-foreground">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </div>
            </section>

            <section className="cosmic-card p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Data Security
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure server infrastructure</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                </ul>
                <p>
                  Your birth date and time information used for calculations is processed locally in your browser when possible and is not permanently stored on our servers unless you explicitly choose to save your results.
                </p>
              </div>
            </section>

            <section className="cosmic-card p-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide relevant advertising through Google AdSense</li>
                  <li>Improve website performance and user experience</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. However, disabling cookies may affect some functionality of our website.
                </p>
              </div>
            </section>

            <section className="cosmic-card p-8">
              <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Our website may include third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Font providers:</strong> For loading web fonts</li>
                </ul>
                <p>
                  These services have their own privacy policies and may collect information independently. We encourage you to review their privacy policies.
                </p>
              </div>
            </section>

            <section className="cosmic-card p-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the personal information we have about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </section>

            <section className="cosmic-card p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p><strong>Email:</strong> privacy@saturnreturn.site</p>
                  <p><strong>Website:</strong> saturnreturn.site/contact</p>
                </div>
              </div>
            </section>

            <section className="cosmic-card p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Changes to This Policy
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p>
                  We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
