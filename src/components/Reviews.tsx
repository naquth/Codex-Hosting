import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviewsData = [
  {
    name: 'Alex Thompson',
    role: 'Bot Developer',
    content: 'CodeX has been incredible for hosting my Discord bots. The uptime is amazing and support is top-notch!',
    rating: 5,
    avatar: 'AT',
  },
  {
    name: 'Sarah Chen',
    role: 'Server Owner',
    content: 'Best Minecraft hosting I\'ve used. Zero lag and great performance for our 100+ player community.',
    rating: 5,
    avatar: 'SC',
  },
  {
    name: 'Mike Rodriguez',
    role: 'Music Bot Creator',
    content: 'Lavalink hosting is seamless. Crystal clear audio and never drops out. Highly recommend!',
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Jennifer Lee',
    role: 'Community Manager',
    content: 'The control panel is intuitive and powerful. Managing our servers has never been easier. 10/10 service!',
    rating: 5,
    avatar: 'JL',
  },
];

const duplicatedReviews = [...reviewsData, ...reviewsData];

const avatarColors = ['bg-blue-600', 'bg-violet-600', 'bg-emerald-600', 'bg-orange-600'];

const Reviews = () => (
  <section id="reviews" className="py-24 px-5 sm:px-8 section-divider overflow-hidden">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
          Testimonials
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Trusted by thousands.
        </h2>
        <p className="text-gray-400 text-sm mt-4">
          Developers and communities who rely on CodeX every day.
        </p>
      </motion.div>

      {/* Marquee */}
      <div className="marquee-fade overflow-hidden">
        <div className="marquee-track-slow py-2">
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="flex-shrink-0 w-72 sm:w-80 mx-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.12] transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-5">
                "{review.content}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                <div className={`w-8 h-8 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {review.avatar}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{review.name}</p>
                  <p className="text-[11px] text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Reviews;
