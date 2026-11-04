import React from "react";

type Item = { term?: string; text: React.ReactNode; children?: Item[] };

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p>{children}</p>
);

const List: React.FC<{ items: Item[] }> = ({ items }) => (
  <ul>
    {items.map((it, i) => (
      <li key={i}>
        {it.term && <strong>{it.term} </strong>}
        {it.text}
        {it.children && <List items={it.children} />}
      </li>
    ))}
  </ul>
);

const Section: React.FC<{
  title: string;
  level?: 2 | 3 | 4;
  children: React.ReactNode;
}> = ({ title, level = 2, children }) => {
  const Tag = `h${level}` as "h2" | "h3" | "h4";
  return (
    <section className={`pp-sec pp-l${level}`}>
      <Tag id={slug(title)}>{title}</Tag>
      {children}
    </section>
  );
};

const CookieType: React.FC<{
  name: string;
  type: string;
  admin: string;
  purpose: string;
}> = ({ name, type, admin, purpose }) => (
  <div className="pp-cookie">
    <h4>{name}</h4>
    <dl>
      <dt>Type</dt>
      <dd>{type}</dd>
      <dt>Administered by</dt>
      <dd>{admin}</dd>
      <dt>Purpose</dt>
      <dd>{purpose}</dd>
    </dl>
  </div>
);

const WEBSITE = "https://medical-database-app.vercel.app/";

const definitions: Item[] = [
  {
    term: "Account",
    text: "means a unique account created for You to access Our Service or parts of Our Service.",
  },
  {
    term: "Affiliate",
    text: 'means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authorities.',
  },
  {
    term: "Company",
    text: '(referred to as either "the Company", "We", "Us" or "Our" in this Privacy Policy) refers to MYTHICORP, 800 W. Main St., Whitewater, WI 53190.',
  },
  {
    term: "Cookies",
    text: "are small files that are placed on Your computer, mobile device, or any other device by a website, containing the details of Your browsing history on that website, among its many uses.",
  },
  { term: "Country/State", text: "refers to: Wisconsin, United States." },
  {
    term: "Device",
    text: "means any device that can access the Service, such as a computer, a cell phone, or a digital tablet.",
  },
  {
    term: "Personal Data",
    text: '(or "Personal Information") is any information that relates to an identified or identifiable individual.',
  },
  {
    text: 'We use "Personal Data" and "Personal Information" interchangeably unless a law uses a specific term.',
  },
  { term: "Service", text: "refers to the Website." },
  {
    term: "Service Provider",
    text: "means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.",
  },
  {
    term: "Usage Data",
    text: "refers to data collected automatically, either generated using the Service or from the Service infrastructure itself (for example, the duration of a page visit).",
  },
  {
    term: "User",
    text: "means any individual who accesses or uses the Service.",
  },
  {
    term: "Website",
    text: (
      <>
        refers to MYTHICORP, accessible from{" "}
        <a href={WEBSITE} target="_blank" rel="noopener noreferrer">
          {WEBSITE}
        </a>
        .
      </>
    ),
  },
  {
    term: "You",
    text: "mean the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="pp-root">
      <style>{css}</style>

      <div className="pp-layout">
        <article className="pp-article">
          <header>
            <h1>Privacy Policy</h1>
            <P>
              This Privacy Policy describes our policies and procedures
              regarding the collection of your information when you use our
              service and tells you about your privacy rights and how the law
              protects you. We use your personal data to improve our service. We
              collect, use, and disclose your information as described in this
              Privacy Policy.
            </P>
          </header>

          <Section title="Definitions">
            <List items={definitions} />
          </Section>

          <Section title="Collecting and Using Your Personal Information">
            <Section title="Types of Data Collected" level={3}>
              <Section title="Personal Data" level={4}>
                <P>
                  While using Our Service, we may ask You to provide Us with
                  certain personally identifiable information that can be used
                  to contact or identify You. Personally identifiable
                  information may include, but is not limited to:
                </P>
                <List
                  items={[
                    { text: "Email address" },
                    { text: "First name and last name" },
                    { text: "Phone number" },
                    {
                      text: "Address, State, Province, ZIP/Postal code, City.",
                    },
                  ]}
                />
              </Section>

              <Section title="Usage Data" level={4}>
                <P>Usage Data is collected automatically when using the Service.</P>
                <P>
                  Usage Data may include information such as Your Device's
                  Internet Protocol address (e.g. IP address), browser type,
                  browser version, the pages of Our Service that You visit, the
                  time and date of Your visit, the time spent on those pages,
                  unique device identifiers and other diagnostic data.
                </P>
                <P>
                  When You access the Service by or through a mobile device, we
                  may collect certain information automatically, including, but
                  not limited to, the type of mobile device You use, your mobile
                  device's unique ID, the IP address of Your mobile device, Your
                  mobile operating system, the type of mobile Internet browser
                  You use, unique device identifiers and other diagnostic data.
                </P>
                <P>
                  We may also collect information that Your browser sends
                  whenever You visit Our Service or when You access the Service
                  by or through a mobile device.
                </P>
              </Section>

              <Section title="Tracking Technologies and Cookies" level={4}>
                <P>
                  We use tracking technologies (such as cookies) to track the
                  activity and to improve Our Service. The technologies We use
                  may include:
                </P>
                <List
                  items={[
                    {
                      term: "Cookies or Browser Cookies.",
                      text: "A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, you may not be able to use some parts of Our Service.",
                    },
                    {
                      term: "Web Beacons.",
                      text: "Certain sections of Our Service may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).",
                    },
                  ]}
                />
                <P>
                  Cookies can be "Persistent" or "Session" Cookies. Persistent
                  Cookies remain on Your personal computer or mobile device when
                  You go offline, while Session Cookies are deleted as soon as
                  You close Your web browser.
                </P>
                <P>
                  Where required by law, we use non-essential cookies (that is,
                  Cookies other than the Necessary / Essential Cookies described
                  below) only with Your consent. You can withdraw or change Your
                  consent at any time using Our cookie preferences tool (if
                  available) or through Your browser/device settings.
                  Withdrawing consent does not affect the lawfulness of
                  processing based on consent before its withdrawal.
                </P>
                <P>
                  We use both Session and Persistent Cookies for the purposes
                  set out below:
                </P>

                <CookieType
                  name="Necessary / Essential Cookies"
                  type="Session Cookies"
                  admin="Us"
                  purpose="These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services."
                />
                <CookieType
                  name="Cookies Policy / Notice Acceptance Cookies"
                  type="Persistent Cookies"
                  admin="Us"
                  purpose="These Cookies identify whether users have accepted the use of cookies on the Website and record the consent choices You have made, so that We can honor those choices on future visits."
                />
                <CookieType
                  name="Functionality Cookies"
                  type="Persistent Cookies"
                  admin="Us"
                  purpose="These Cookies allow Us to remember choices You make when You use the Website, such as remembering Your Account login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter Your preferences every time You use the Website."
                />
              </Section>
            </Section>

            <Section title="Use of Your Personal Data" level={3}>
              <P>The Company may use Personal Data for the following purposes:</P>
              <List
                items={[
                  {
                    term: "To provide and maintain Our Service,",
                    text: "including to monitor the usage of Our Service.",
                  },
                  {
                    term: "To manage Your Account:",
                    text: "to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.",
                  },
                  {
                    term: "For the performance of a contract:",
                    text: "the development, compliance and undertaking of the purchase contract for the products, items, or services You have purchased or of any other contract with Us through the Service.",
                  },
                  {
                    term: "To contact You:",
                    text: "To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.",
                  },
                  {
                    term: "To provide You",
                    text: "with news, unique offers, and general information about other goods, services, and events which We offer that are like those that You have already purchased or inquired about. We send such marketing communications only were permitted by applicable law: where prior consent is required (for example, under the laws applicable in the EEA and the UK), We will send them only with Your consent; otherwise, we may send them until You opt out. You may opt out or withdraw Your consent at any time by using the unsubscribe link in any marketing email We send or by contacting Us.",
                  },
                  {
                    term: "To manage Your requests:",
                    text: "To attend and manage Your requests to Us.",
                  },
                  {
                    term: "For business transfers:",
                    text: "We may use Your Personal Data to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about Our Service users is among the assets transferred.",
                  },
                  {
                    term: "For other purposes:",
                    text: "We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of Our promotional campaigns, and evaluating and improving Our Service, products, services, marketing, and Your experience.",
                  },
                ]}
              />
              <P>We may share Your Personal Data in the following situations:</P>
              <List
                items={[
                  {
                    term: "With Service Providers:",
                    text: "We may share Your Personal Data with Service Providers to monitor and analyze the use of Our Service, and to contact You.",
                  },
                  {
                    term: "For business transfers:",
                    text: "We may share or transfer Your Personal Data in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.",
                  },
                  {
                    term: "With Affiliates:",
                    text: "We may share Your Personal Data with Our affiliates, in which case We will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners, or other companies that We control or that are under common control with Us.",
                  },
                  {
                    term: "With other users:",
                    text: "If Our Service offers public areas, when You share Personal Data or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside the Service.",
                  },
                  {
                    term: "With Your consent:",
                    text: "We may disclose Your Personal Data for any other purpose with Your consent.",
                  },
                ]}
              />
            </Section>
          </Section>

          <Section title="Text Messages Privacy Notice">
            <P>
              You have the option to receive text (SMS) messages from Us. If You
              opt in to text messages, we will send You updates, notifications,
              and other communications as described below. When You opt in, we
              will collect and store the information You provide in connection
              with text messaging, such as Your phone number, the date and
              method of Your consent, and message delivery and read information.
            </P>
            <P>
              No mobile information will be shared with or sold to third parties
              or affiliates for marketing or promotional purposes. The phone
              numbers and consent records We collect for texting are never
              shared with anyone for any purpose, except the Service Providers
              that technically must handle them to deliver the texts.
            </P>
            <P>
              Consent to receive text messages is not a condition of any
              purchase or use of Our Service. If You consent to receive SMS from
              Us, you agree to receive text messages from Us related to:
            </P>
            <List
              items={[
                { text: "Customer care and support" },
                {
                  text: "Account notifications, such as activity, status, or renewal reminders.",
                },
                {
                  text: "Delivery notifications and updates on the status of a delivery",
                },
                {
                  text: "Authentication messages, such as one-time passwords (OTP) and passcodes",
                },
                {
                  text: "Security alerts, such as suspicious login attempts or unusual account activity.",
                },
                {
                  text: "Marketing and promotional offers, discounts, and other promotional content",
                },
              ]}
            />
            <P>
              Reply STOP to opt-out. Reply HELP for support. Message &amp; data
              rates may apply. Messaging frequency may vary. Carriers are not
              liable for delayed or undelivered messages.
            </P>
          </Section>

          <Section title="Retention of Your Personal Data">
            <P>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with Our legal obligations (for example, if We are required
              to retain Your data to comply with applicable laws), resolve
              disputes, and enforce Our legal agreements and policies.
            </P>
            <P>
              Where possible, we apply shorter retention periods and/or reduce
              identifiability by deleting, aggregating, or anonymizing data.
              Unless otherwise stated, the retention periods below are maximum
              periods ("up to") and We may delete or anonymize data sooner when
              it is no longer needed for the relevant purpose. We apply
              different retention periods to various categories of Personal Data
              based on the purpose of processing and legal obligations:
            </P>
            <List
              items={[
                {
                  text: "Account Information",
                  children: [
                    {
                      text: "User Accounts: retained for the duration of Your Account relationship plus up to 24 months after account closure to manage any post-termination issues or resolve disputes.",
                    },
                  ],
                },
                {
                  text: "Customer Support Data",
                  children: [
                    {
                      text: "Support tickets and correspondence: up to 24 months from the date of ticket closure to resolve follow-up inquiries, track service quality, and defend against potential legal claims.",
                    },
                    {
                      text: "Chat transcripts: up to 24 months for quality assurance and staff training purposes.",
                    },
                  ],
                },
                {
                  text: "Usage Data",
                  children: [
                    {
                      text: "Website analytics data (cookies, IP addresses, device identifiers): up to 24 months from the date of collection, which allows us to analyze trends while respecting privacy principles.",
                    },
                    {
                      text: "Server logs (IP addresses, access times): up to 24 months for security monitoring and troubleshooting purposes.",
                    },
                  ],
                },
              ]}
            />
            <P>
              Usage Data is retained in accordance with the retention periods
              described above and may be retained longer only where necessary for
              security, fraud prevention, or legal compliance.
            </P>
            <P>
              We may retain Personal Data beyond the periods stated above for
              several reasons:
            </P>
            <List
              items={[
                {
                  text: "Legal obligation: We are required by law to retain specific data (e.g., financial records for tax authorities).",
                },
                {
                  text: "Legal claims: Data is necessary to establish, exercise, or defend legal claims.",
                },
                { text: "Your explicit request: You ask Us to retain specific information." },
                {
                  text: "Technical limitations: Data exists in backup systems that are scheduled for routine deletion.",
                },
              ]}
            />
            <P>
              You may request information about how long We will retain Your
              Personal Data by contacting Us.
            </P>
            <P>
              When retention periods expire, we securely delete or anonymize
              Personal Data according to the following procedures:
            </P>
            <List
              items={[
                {
                  text: "Deletion: Personal Data is removed from Our systems and no longer actively processed.",
                },
                {
                  text: "Backup retention: Residual copies may remain in encrypted backups for a limited period consistent with Our backup retention schedule and are not restored except where necessary for security, disaster recovery, or legal compliance.",
                },
                {
                  text: "Anonymization: In some cases, we convert Personal Data into anonymous statistical data that cannot be linked back to You. This anonymized data may be retained indefinitely for research and analytics.",
                },
              ]}
            />
          </Section>

          <Section title="Transfer of Your Personal Data">
            <P>
              Your information, including Personal Data, is processed at the
              Company's operating offices and in any other places where the
              parties involved in the processing are located. This means that
              this information may be transferred to — and maintained on —
              computers located outside of Your state, province, country, or
              other governmental jurisdiction where the data protection laws may
              differ from those of Your area.
            </P>
            <P>
              Where required by applicable law, we will ensure that
              international transfers of Your Personal Data are subject to
              appropriate safeguards and, where relevant, supplementary
              measures. The Company will take all steps reasonably necessary to
              ensure that Your data is treated securely and in accordance with
              this Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place, including the security of Your data and other
              personal information.
            </P>
          </Section>

          <Section title="Delete Your Personal Data">
            <P>
              You have the right to delete or request that We assist in deleting
              the Personal Data that We have collected about You.
            </P>
            <P>
              Our Service may give You the ability to delete certain information
              about You from within the Service.
            </P>
            <P>
              You may update, amend, or delete Your information at any time by
              signing in to Your Account, if You have one, and visiting the
              account settings section that allows You to manage Your personal
              information. You may also contact Us to request access to,
              correct, or delete any Personal Data that You have provided to Us.
            </P>
            <P>
              Please note, however, that We may need to retain certain
              information when We have a legal obligation or lawful basis to do
              so.
            </P>
          </Section>

          <Section title="Disclosure of Your Personal Data">
            <Section title="Business Transactions" level={3}>
              <P>
                If the Company is involved in a merger, acquisition or asset
                sale, Your Personal Data may be transferred. We will provide
                notice before Your Personal Data is transferred and becomes
                subject to a different Privacy Policy.
              </P>
            </Section>
            <Section title="Law Enforcement" level={3}>
              <P>
                Under certain circumstances, the Company may disclose Your
                Personal Data if required to do so by law or in response to
                valid requests by public authorities (e.g., a court or a
                government agency).
              </P>
            </Section>
            <Section title="Other Legal Requirements" level={3}>
              <P>
                The Company may disclose Your Personal Data in the good-faith
                belief that such action is necessary to:
              </P>
              <List
                items={[
                  { text: "Comply with a legal obligation." },
                  { text: "Protect and defend the rights or property of the Company." },
                  { text: "Prevent or investigate wrongdoing in connection with the Service." },
                  { text: "Protect the personal safety of Users of the Service or the public." },
                  { text: "Protect against legal liability." },
                ]}
              />
            </Section>
          </Section>

          <Section title="Security of Your Personal Data">
            <P>
              The security of Your Personal Data is important to Us but remember
              that no method of transmission over the Internet, or method of
              electronic storage, is 100% secure. While We strive to use
              commercially reasonable means to protect Your Personal Data, we
              cannot guarantee its absolute security.
            </P>
          </Section>

          <Section title="Detailed Information on the Processing of Your Personal Data">
            <P>
              The Service Providers We use may have access to Your Personal Data.
              These third-party vendors collect, store, use, process, and
              transfer information about Your activity on Our Service in
              accordance with their Privacy Policies.
            </P>
            <Section title="Usage, Performance and Miscellaneous" level={3}>
              <P>
                We may use third-party Service Providers to maintain and improve
                Our Service.
              </P>
              <List
                items={[
                  {
                    term: "Google Places",
                    text: (
                      <>
                        <span className="pp-block">
                          Google Places is a service that returns information
                          about places using HTTP requests. It is operated by
                          Google.
                        </span>
                        <span className="pp-block">
                          Google Places service may collect information from You
                          and from Your Device for security purposes.
                        </span>
                        <span className="pp-block">
                          The information gathered by Google Places is held in
                          accordance with the Privacy Policy of Google:{" "}
                          <a
                            href="https://www.google.com/intl/en/policies/privacy/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            https://www.google.com/intl/en/policies/privacy/
                          </a>
                        </span>
                      </>
                    ),
                  },
                ]}
              />
            </Section>
          </Section>

          <Section title="Children's and Minors' Privacy">
            <P>
              The Service is not directed to, and We do not knowingly collect
              Personal Information from, anyone under the age of sixteen.
            </P>
            <P>
              If You are a parent or guardian and You believe Your child has
              provided Us with Personal Information, please contact Us. If We
              become aware that We have collected Personal Information from
              anyone under the age of sixteen, we will take steps to remove that
              information from Our servers as soon as reasonably possible.
            </P>
            <P>
              Some countries and states set a higher age at which an individual
              can consent to the processing of their own Personal Information.
              Where We rely on consent as a legal basis and the law applicable to
              a User sets an age higher than sixteen, we may require the consent
              of that User's parent or guardian before We collect and use their
              Personal Information.
            </P>
          </Section>

          <Section title="Links to Other Websites">
            <P>
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third-party link, you will be
              directed to that third party's site. We strongly advise You to
              review the Privacy Policy of every site You visit.
            </P>
            <P>
              We have no control over and assume no responsibility for the
              content, privacy policies or practices of any third-party sites or
              services.
            </P>
          </Section>

          <Section title="Changes to this Privacy Policy">
            <P>
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
            </P>
            <P>
              We will let You know via email and/or a prominent notice on Our
              Service, prior to the change becoming effective and update the
              "Last updated" date at the top of this Privacy Policy.
            </P>
            <P>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they are
              posted on this page.
            </P>
          </Section>

          <Section title="Contact Us">
            <P>
              If You have any questions about this Privacy Policy, you can
              contact Us:
            </P>
            <List
              items={[
                {
                  text: (
                    <>
                      By visiting this page on Our Website:{" "}
                      <a href={WEBSITE} target="_blank" rel="noopener noreferrer">
                        {WEBSITE}
                      </a>
                    </>
                  ),
                },
              ]}
            />
          </Section>
        </article>
      </div>
    </div>
  );
}

const css = `
.pp-root {
  --pp-bg: #fbfbf9;
  --pp-ink: #1d2327;
  --pp-muted: #5b6770;
  --pp-rule: #dcdfe0;
  --pp-accent: #1b5e63;
  --pp-panel: #f1f4f4;
  background: var(--pp-bg);
  color: var(--pp-ink);
  font-family: Georgia, "Iowan Old Style", "Times New Roman", serif;
  line-height: 1.7;
  padding: 2.5rem 1.25rem 4rem;
}
@media (prefers-color-scheme: dark) {
  .pp-root {
    --pp-bg: #14191b;
    --pp-ink: #e6e9ea;
    --pp-muted: #9aa6ad;
    --pp-rule: #2c3538;
    --pp-accent: #6fc2c8;
    --pp-panel: #1b2225;
  }
}
.pp-layout {
  max-width: 42rem;
  margin: 0 auto;
}

.pp-article a:focus-visible {
  outline: 2px solid var(--pp-accent);
  outline-offset: 2px;
}

.pp-article { font-size: 1.0625rem; }
.pp-article h1 {
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 1.25rem;
}
.pp-article h2 {
  font-size: 1.6rem;
  line-height: 1.25;
  margin: 3.25rem 0 0.9rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--pp-rule);
  scroll-margin-top: 1.5rem;
}
.pp-article h3 { font-size: 1.25rem; margin: 2rem 0 0.6rem; }
.pp-article h4 { font-size: 1.05rem; margin: 1.5rem 0 0.4rem; }
.pp-sec .pp-sec h2 { border-top: 0; }
.pp-article p { margin: 0 0 1rem; }
.pp-article ul { margin: 0 0 1.25rem; padding-left: 1.4rem; }
.pp-article li { margin: 0 0 0.6rem; padding-left: 0.2rem; }
.pp-article li > ul { margin: 0.6rem 0 0.2rem; }
.pp-article a { color: var(--pp-accent); text-underline-offset: 3px; overflow-wrap: anywhere; }
.pp-block { display: block; margin: 0.4rem 0 0; }

.pp-cookie {
  background: var(--pp-panel);
  border-left: 3px solid var(--pp-accent);
  padding: 0.9rem 1.1rem 0.4rem;
  margin: 1.1rem 0;
  border-radius: 0 4px 4px 0;
}
.pp-article .pp-cookie h4 { margin: 0 0 0.5rem; }
.pp-cookie dl {
  display: grid;
  grid-template-columns: 8.5rem 1fr;
  gap: 0.35rem 1rem;
  margin: 0 0 0.6rem;
  font-size: 0.98rem;
}
.pp-cookie dt { color: var(--pp-muted); font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 0.875rem; padding-top: 0.1rem; }
.pp-cookie dd { margin: 0; }
@media (max-width: 34rem) {
  .pp-cookie dl { grid-template-columns: 1fr; gap: 0; }
  .pp-cookie dd { margin-bottom: 0.5rem; }
}

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
`;