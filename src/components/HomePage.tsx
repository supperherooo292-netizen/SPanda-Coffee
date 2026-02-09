import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Coffee, Heart, Award, MapPin, Phone, Mail, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export function HomePage() {
  const navigate = useNavigate();
  const { menuItems, addToCart, testimonials, addTestimonial } = useApp();
  
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5 });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const featuredDrinks = menuItems.filter(item => item.category === 'coffee').slice(0, 4);
  
  // Filter only approved testimonials
  const approvedTestimonials = testimonials.filter(t => t.approved);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.text.trim()) {
      addTestimonial({
        name: formData.name,
        text: formData.text,
        rating: formData.rating,
        approved: false,
      });
      setFormData({ name: '', text: '', rating: 5 });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(61, 40, 23, 0.5), rgba(61, 40, 23, 0.5)), url('https://images.unsplash.com/photo-1743689374053-be49ca407b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBoZXJvJTIwd2FybXxlbnwxfHx8fDE3Njk3NjAyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl font-serif md:text-7xl mb-6 text-[#FAF8F5]">Happiness in Every Sip of Coffee</h1>
          <p className="text-xl md:text-2xl font-serif mb-8 text-[#E8DDD0]">Rasakan perpaduan sempurna antara kopi berkualitas premium dan suasana yang hangat dan menyenangkan</p>
        </div>
      </section>

      {/* Featured Drinks */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Coffee className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-4xl mb-4">Minuman Pilihan Kami</h2>
            <p className="text-muted-foreground text-lg">Dibuat dengan cinta menggunakan biji kopi premium pilihan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDrinks.map((drink) => (
              <Card key={drink.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border bg-card">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={drink.image} 
                    alt={drink.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-2">{drink.name}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{drink.description}</p> 
                  <span className="text-2xl text-primary">Rp {drink.price.toLocaleString('id-ID')}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl mb-6">Kisah Kami</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Didirikan pada tahun 2015, kafe kami telah menjadi bagian penting dari komunitas lokal. Kami berkomitmen untuk menyajikan kopi yang luar biasa dan menciptakan kenangan indah bagi setiap pelanggan. Kami percaya bahwa kopi yang sempurna memiliki kekuatan untuk menyatukan orang-orang.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Setiap biji dipilih dengan cermat, setiap cangkir dibuat dengan presisi, dan setiap pelanggan diperlakukan seperti keluarga. Itulah janji yang kami berikan dengan setiap tegukan.
            </p>
            <div className="flex gap-8 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                <span>Dibuat dengan Cinta</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span>Kualitas Premium</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => navigate('/about')}
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1593536488177-1eb3c2d4e3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3IlMjBjb3p5fGVufDF8fHx8MTc2OTc2MDI5NHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Interior Kafe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Café Photos */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-center mb-12">Jelajahi Tempat Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden h-80">
              <img 
                src="https://images.unsplash.com/photo-1618108487640-249b7e29d73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjB3b29kZW58ZW58MXx8fHwxNzY5NzYwMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Café Space"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-xl overflow-hidden h-80">
              <img 
                src="https://images.unsplash.com/photo-1672570050756-4f1953bde478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzY5NzIwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Coffee Beans"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-xl overflow-hidden h-80">
              <img 
                src="https://images.unsplash.com/photo-1539021897569-06e9fa3c6bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwY29mZmVlfGVufDF8fHx8MTc2OTcwMTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Barista at Work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-center mb-12">Ulasan Pelanggan</h2>
          
          {/* Testimonials Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {approvedTestimonials.length > 0 ? (
              approvedTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#D4A574] text-[#D4A574]" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-medium">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-8">
                Belum ada ulasan. Jadilah yang pertama! ✨
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="max-w-2xl mx-auto bg-card rounded-lg border border-border p-8">
            <h3 className="text-2xl mb-6">Bagikan Pengalaman Anda</h3>
            
            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
                ✓ Terima kasih! Ulasan Anda akan ditampilkan setelah disetujui admin.
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nama</label>
                <Input
                  type="text"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Penilaian</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? 'fill-[#D4A574] text-[#D4A574]'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ulasan</label>
                <Textarea
                  placeholder="Bagikan pengalaman Anda di Warung Kopi Nyaman..."
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  required
                  className="resize-none"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full rounded-full">
                Kirim Ulasan
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3D2817] text-[#FAF8F5] py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl mb-4 text-[#D4A574]">SPanda Coffee</h3>
            <p className="text-[#E8DDD0] text-sm">Menyajikan kebahagiaan sejak 2015</p>
          </div>
          
          <div>
            <h4 className="mb-4 text-[#D4A574]">Contact Person</h4>
            <div className="space-y-2 text-sm text-[#E8DDD0]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>SPandacoffee@Gamil.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Jl. Ki Mangun Sarkoro No.VI/3, Dusun Talun, Beji, Kec. Boyolangu, Kabupaten Tulungagung, Jawa Timur 66233</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-[#D4A574]">Jam Operasional</h4>
            <div className="space-y-2 text-sm text-[#E8DDD0]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <div>
                  <div>Senin - Jumat: 7AM - 8PM</div>
                  <div>Sabtu - Minggu: 8AM - 9PM</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-[#D4A574]">Ikuti Kami</h4>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-[#D4A574] transition-colors">Facebook</a>
              <a href="#" className="hover:text-[#D4A574] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#D4A574] transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-[#54392B] text-center text-sm text-[#E8DDD0]">
          <p>&copy; 2026 Warung Kopi Nyaman. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
