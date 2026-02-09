import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Star, Trash2, Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function TestimonialManagement() {
  const { testimonials, toggleTestimonialApproval, deleteTestimonial } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterApproved, setFilterApproved] = useState<'all' | 'approved' | 'pending'>('all');

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterApproved === 'all' || 
                         (filterApproved === 'approved' && t.approved) ||
                         (filterApproved === 'pending' && !t.approved);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: testimonials.length,
    approved: testimonials.filter(t => t.approved).length,
    pending: testimonials.filter(t => !t.approved).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manajemen Ulasan Pelanggan</h1>
        <p className="text-muted-foreground">Kelola dan setujui ulasan dari pelanggan</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-muted-foreground text-sm">Total Ulasan</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-muted-foreground text-sm">Disetujui</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-muted-foreground text-sm">Menunggu Persetujuan</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Cari ulasan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            {(['all', 'approved', 'pending'] as const).map((filter) => (
              <Button
                key={filter}
                variant={filterApproved === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterApproved(filter)}
              >
                {filter === 'all' && 'Semua'}
                {filter === 'approved' && 'Disetujui'}
                {filter === 'pending' && 'Menunggu'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.length > 0 ? (
          filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className={testimonial.approved ? 'border-green-200 bg-green-50/30' : 'border-yellow-200 bg-yellow-50/30'}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#D4A574] text-[#D4A574]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(testimonial.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      testimonial.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testimonial.approved ? '✓ Disetujui' : '○ Menunggu'}
                    </div>
                  </div>

                  {/* Text */}
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      size="sm"
                      variant={testimonial.approved ? 'outline' : 'default'}
                      onClick={() => toggleTestimonialApproval(testimonial.id)}
                      className="flex-1"
                    >
                      {testimonial.approved ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Batalkan Persetujuan
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Setujui
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (confirm('Hapus ulasan ini?')) {
                          deleteTestimonial(testimonial.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              Tidak ada ulasan yang cocok dengan filter
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
