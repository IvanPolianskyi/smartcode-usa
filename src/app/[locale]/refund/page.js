export default function RefundPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '100px auto', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Refund Policy</h1>
      <p style={{ marginBottom: '40px', color: '#94a3b8' }}>At SmartCode Academy, we strive to ensure your complete satisfaction with our educational courses.</p>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>1. Cancellation Before Course Start</h2>
        <p style={{ lineHeight: '1.6' }}>If you cancel your enrollment at least 24 hours before the scheduled start time of a live course or the first lesson, you are entitled to a full 100% refund.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>2. Interrupted Studies</h2>
        <p style={{ lineHeight: '1.6' }}>If you decide to stop learning after the course has started, we offer a proportional refund for the remaining uncompleted lessons. Access to the platform for the completed period will remain active according to the plan terms.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>3. Self-Paced Courses</h2>
        <p style={{ lineHeight: '1.6' }}>For self-paced video courses, refunds can be requested within 14 days of purchase, provided that less than 20% of the course material has been viewed or completed.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#60a5fa' }}>4. Processing Time</h2>
        <p style={{ lineHeight: '1.6' }}>Approved refunds are processed within 5-10 business days and returned automatically to the original payment method (e.g., your Visa or Mastercard) used via our payment gateway.</p>
      </section>
    </div>
  )
}
