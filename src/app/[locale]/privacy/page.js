export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '100px auto', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Privacy Policy</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>1. Data Collection</h2>
        <p style={{ lineHeight: '1.6' }}>We collect essential data from students and payers necessary to deliver our educational services. This includes names, contact information (email, phone number), and payment transaction details.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>2. Data Processing and Storage</h2>
        <p style={{ lineHeight: '1.6' }}>Student and payer data is processed securely and stored on encrypted servers. We adhere to strict data protection standards and do not sell your personal data to third parties under any circumstances.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>3. Payment Information</h2>
        <p style={{ lineHeight: '1.6' }}>Payment information is handled securely by our certified payment gateway partner, WayForPay. We do not process or store full credit card numbers, CVV codes, or expiration dates on our own servers.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>4. Minor's Privacy</h2>
        <p style={{ lineHeight: '1.6', background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <strong>Special Notice Regarding Minors:</strong> We are committed to protecting the privacy of our underage students. Any data related to minors is strictly managed with parental consent, and we collect only the minimum amount of information required for educational participation and progress tracking.
        </p>
      </section>
    </div>
  )
}
