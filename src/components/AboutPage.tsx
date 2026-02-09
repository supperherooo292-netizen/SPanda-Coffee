import React from 'react';
import { Card, CardContent } from './ui/card';
import { Heart, Award, Users, Coffee } from 'lucide-react';

export function AboutPage() {
  const team = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      role: 'Barista Kepala',
      image: 'https://images.unsplash.com/photo-1539021897569-06e9fa3c6bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwY29mZmVlfGVufDF8fHx8MTc2OTcwMTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      name: 'Maria Santos',
      role: 'Ahli Kopi',
      image: 'https://images.unsplash.com/photo-1655655555559-70610bfe5598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwbGF0dGUlMjBhcnQlMjBiYXJpc3RhfGVufDF8fHx8MTc2OTc2MDI5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'James Wilson',
      role: 'Chef Pastry',
      image: 'https://images.unsplash.com/photo-1593536488177-1eb3c2d4e3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3IlMjBjb3p5fGVufDF8fHx8MTc2OTc2MDI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 font-serif">About SPanda Coffee</h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Kami bukan hanya sekadar kedai kopi biasa. Kami adalah pusat komunitas di mana passion untuk kualitas bertemu dengan kehangatan hubungan manusia.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1618108487640-249b7e29d73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjB3b29kZW58ZW58MXx8fHwxNzY5NzYwMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Kisah Kami"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl mb-6">Kisah Kami</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Warung Kopi Nyaman dimulai pada tahun 2015 dengan mimpi sederhana: menciptakan ruang di mana kopi luar biasa bertemu dengan keramahan yang tulus. Pendiri kami, pecinta kopi yang bersemangat, berkeliling dunia mencari biji terbaik dan belajar dari master roaster.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Hari ini, kami bangga menjadi favorit di lingkungan, melayani minuman buatan tangan dengan cinta dan presisi. Setiap cangkir menceritakan kisah dedikasi, kualitas, dan komunitas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Kami percaya bahwa kopi lebih dari sekadar minuman—ini adalah pengalaman, momen kenyamanan, dan katalis untuk koneksi.
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="bg-card border-border p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl">Visi Kami</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi jantung komunitas kami, di mana setiap orang merasa diterima, dihargai, dan terinspirasi. Kami memimpikan dunia di mana kopi menyatukan orang-orang dan menciptakan momen bermakna.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl">Misi Kami</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Menyajikan kopi luar biasa yang dibuat dengan biji premium, diseduh dengan keahlian, dan dihidangkan dengan senyuman. Kami berkomitmen pada keberlanjutan, kualitas, dan menciptakan ruang yang hangat untuk semua.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="bg-muted/30 rounded-3xl p-12 mb-20">
          <h2 className="text-4xl text-center mb-12">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Kualitas Pertama</h3>
              <p className="text-muted-foreground">
                Kami hanya mempilih biji terbaik dan menggunakan teknik ahli untuk memastikan setiap cangkir sempurna.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl mb-3">Dibuat dengan Cinta</h3>
              <p className="text-muted-foreground">
                Setiap minuman dibuat dengan perhatian, passion, dan detail oleh barista terampil kami.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl mb-3">Fokus Komunitas</h3>
              <p className="text-muted-foreground">
                Kami berkomitmen untuk menciptakan ruang yang hangat di mana semua orang merasa di rumah.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-4xl text-center mb-12">Bertemu dengan Tim Barista Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.id} className="overflow-hidden bg-card border-border group">
                <div className="h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
