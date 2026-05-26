export default function TermsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '100px auto', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Terms and Conditions</h1>
      <p style={{ marginBottom: '40px', color: '#94a3b8' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>1. General Terms</h2>
        <p style={{ lineHeight: '1.6' }}>These Terms and Conditions govern your use of the SmartCode Academy educational platform and its services.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>2. Legal Guardianship</h2>
        <p style={{ lineHeight: '1.6', background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <strong>IMPORTANT:</strong> All agreements, purchases, and contracts are strictly formed with parents or legal guardians, as they are the authorized payers for the underage students (ages 8-17) utilizing our services. Minors may not make purchases on this site.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>3. Services</h2>
        <p style={{ lineHeight: '1.6' }}>We provide online educational courses in programming (Python, Roblox, Unity, Web Development) through live zoom sessions and our online learning platform.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>4. Pricing and Payments</h2>
        <p style={{ lineHeight: '1.6' }}>All prices are explicitly stated on the checkout pages. Payments are processed securely via our payment gateway partner, WayForPay. There are no hidden fees.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>5. Merchant Information</h2>
        <div style={{ lineHeight: '1.6', background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '8px' }}>
          <strong>Merchant Name:</strong> FOP Ivan Polianskyi<br/>
          <strong>Tax ID (RNKPP/INN):</strong> 1234567890<br/>
          <strong>Support Email:</strong> support@smartcode-academy.com<br/>
          <strong>Contact Phone:</strong> +380 99 123 45 67
        </div>
      </section>
    </div>
  )
}
