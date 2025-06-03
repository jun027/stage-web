import Footer from './footer'
import Header from './header'

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  )
}
