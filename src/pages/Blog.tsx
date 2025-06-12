import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FloatingStarsText from '@/components/FloatingStarsText';
import FloatingSaturn from '@/components/FloatingSaturn';
import AdSenseAd from '@/components/AdSenseAd';
import OptimizedImage from '@/components/OptimizedImage';
import BlogSEO from '@/components/BlogSEO';
import RelatedPosts from '@/components/RelatedPosts';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  imageAlt: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 'what-is-saturn-return',
    title: 'What Is Saturn Return?',
    excerpt: 'Discover the fundamental concepts behind one of astrology\'s most significant life transits and how it shapes your personal growth.',
    content: `Saturn Return is one of the most significant astrological events in a person's life. This cosmic event happens approximately every 29.5 years, marking major life transitions.

**The Astronomical Reality**

Saturn takes about 29.5 Earth years to complete one full orbit around the Sun. When it returns to its natal position in your birth chart, it creates a powerful astrological influence.

**Key Characteristics of Saturn Return**

During a Saturn Return, you may experience:
• A strong urge to reassess your life direction
• Increased responsibility and accountability  
• The end of relationships that no longer serve you
• A desire to build more authentic life structures
• Challenges that lead to greater maturity

**The Three Saturn Returns**

Most people experience two to three Saturn Returns:

**First Saturn Return (ages 27-30)**: Often called the "quarter-life crisis," involving career decisions and relationship commitments.

**Second Saturn Return (ages 57-60)**: A time of life review and wisdom-gathering, often coinciding with retirement planning.

**Third Saturn Return (ages 87-90)**: For those fortunate to experience it, this represents the completion of a full life cycle.

**Embracing the Challenge**

While Saturn Returns can feel challenging, they serve an important purpose in human development. They force us to confront areas that need restructuring.

Want to know exactly when your Saturn Return occurs? Check out our [Saturn Return Calculator](/calculator) for personalized timing, or learn [how to calculate it yourself](/blog/how-to-calculate-saturn-return).`,
    author: 'Cosmic Insights Team',
    date: '2025-05-15',
    readTime: '5 min read',
    category: 'Astrology Basics',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80',
    imageAlt: 'Starry night sky representing cosmic cycles and Saturn Return',
    tags: ['saturn return', 'astrology', 'life transitions', 'personal growth']
  },
  {
    id: 'how-to-calculate-saturn-return',
    title: 'How to Calculate Your Saturn Return: Step-by-Step Guide',
    excerpt: 'Learn the exact method to calculate your Saturn Return dates manually, including the astronomical principles and mathematical formulas involved.',
    content: `Calculating your Saturn Return requires understanding Saturn's orbital period and your birth chart position. Here's how to do it step by step.

**Understanding Saturn's Orbital Period**

Saturn completes one orbit around the Sun in approximately 29 years, 5 months, and 17 days (29.457 years precisely). This means your Saturn Return occurs when Saturn returns to the exact position it occupied when you were born.

**Method 1: Simple Addition**

The easiest way to calculate your Saturn Return:

**For First Saturn Return:**
• Add 29.5 years to your birth date
• This gives you the approximate center of your Saturn Return period

**Example Calculation:**
• Birth date: January 15, 1995
• First Saturn Return: January 15, 1995 + 29.5 years = July 15, 2024

**For Second Saturn Return:**
• Add 59 years to your birth date
• Second Saturn Return: January 15, 1995 + 59 years = January 15, 2054

**Method 2: Precise Astronomical Calculation**

For exact timing, you need:
• Your birth date, time, and location
• Saturn's position in degrees at birth
• Current Saturn position tracking

**Steps for Precise Calculation:**

**Step 1: Find Your Natal Saturn Position**
Use an ephemeris or online calculator to find Saturn's exact position (degree and sign) at your birth.

**Step 2: Track Saturn's Current Position**
Monitor Saturn's current position in the zodiac using astronomical data.

**Step 3: Calculate the Return**
Your Saturn Return begins when transiting Saturn approaches within 5 degrees of your natal Saturn position.

**Understanding the Saturn Return Window**

Saturn Return isn't a single day but a period lasting approximately 2-3 years:

**Approaching Phase (1-2 years before exact)**
• Subtle pressure building
• Initial life questioning
• Minor structural changes

**Exact Phase (when degrees match):**
• Peak intensity
• Major life decisions
• Significant transitions

**Departing Phase (1-2 years after exact):**
• Integration of lessons
• Stabilization of new structures
• Reflection on changes

**Factors Affecting Timing**

**Saturn's Retrograde Motion:**
Saturn appears to move backward 4-5 months each year, which can:
• Extend the Saturn Return period
• Create multiple exact aspects
• Intensify the experience

**Orb of Influence:**
Most astrologers use a 5-degree orb, meaning effects begin when Saturn is 5 degrees away from your natal position.

**Using Online Tools vs. Manual Calculation**

While manual calculation teaches you the principles, online tools offer advantages:
• Account for retrograde motion
• Include precise astronomical data
• Calculate exact degrees and timing
• Provide visual charts

Our [Saturn Return Calculator](/calculator) uses precise astronomical algorithms for the most accurate results. You can also learn about [recognizing the signs](/blog/signs-of-saturn-return) you're experiencing this transit.

**Verification Methods**

To verify your calculations:
• Cross-reference with multiple sources
• Check against known Saturn Return experiences
• Consult professional astrologers
• Use different calculation methods

**Common Calculation Mistakes**

Avoid these errors:
• Forgetting leap years in manual calculations
• Ignoring time zones for birth time
• Not accounting for Saturn's retrograde periods
• Using approximate rather than exact birth times`,
    author: 'Cosmic Insights Team',
    date: '2025-06-01',
    readTime: '8 min read',
    category: 'Calculation Guide',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80',
    imageAlt: 'Mathematical calculations and astronomical charts for Saturn Return timing',
    tags: ['saturn return calculation', 'astrology mathematics', 'astronomical timing', 'birth chart']
  },
  {
    id: 'when-is-my-saturn-return',
    title: 'When Is My Saturn Return? Timing, Ages, and What to Expect',
    excerpt: 'Discover when your Saturn Return occurs based on your age and birth year, plus what to expect during each phase of this transformative period.',
    content: `Knowing when your Saturn Return occurs helps you prepare for one of life's most transformative periods. Here's everything you need to know about timing.

**Saturn Return Ages by Birth Year**

**If You Were Born in:**

**1994-1996: First Saturn Return 2023-2026**
• Peak intensity: 2024-2025
• Ages 28-30 during the main phase
• Career establishment pressure
• Relationship definition needs

**1991-1993: First Saturn Return 2020-2023**
• Recently completed or completing
• Ages 27-29 during main phase
• Pandemic overlay added complexity
• Digital career pivots common

**1988-1990: First Saturn Return 2017-2020**
• Completed your first Saturn Return
• Ages 27-30 during main phase
• Economic uncertainty influences
• Technology industry boom effects

**1965-1967: Second Saturn Return 2024-2027**
• Currently experiencing or approaching
• Ages 57-60 during main phase
• Pre-retirement life evaluation
• Legacy and wisdom focus

**1962-1964: Second Saturn Return 2021-2024**
• Recently completed or completing
• Ages 57-60 during main phase
• COVID-19 impact on life plans
• Health and lifestyle adjustments

**Saturn Return Duration and Phases**

**Pre-Return Phase (2-3 years before exact)**
• Subtle dissatisfaction emerges
• Initial questioning of life choices
• Minor but noticeable changes begin
• Preparation energy builds

**Core Return Phase (exact return ±1 year)**
• Maximum intensity and pressure
• Major life decisions required
• Significant structural changes
• Peak transformation period

**Post-Return Integration (1-2 years after exact)**
• New structures stabilize
• Lessons integrate into daily life
• Confidence in new direction grows
• Reflection on transformation

**What to Expect by Age**

**Ages 27-30 (First Saturn Return)**

**Career Focus:**
• Pressure to choose "real" career path
• End of experimental job phases
• Professional commitment decisions
• Industry or role major changes

**Relationship Dynamics:**
• Marriage or long-term commitment decisions
• Ending relationships that lack foundation
• Serious partnership evaluations
• Family planning considerations

**Personal Development:**
• Adult identity establishment
• Independence from family expectations
• Personal value system clarification
• Life structure creation

**Ages 57-60 (Second Saturn Return)**

**Life Review:**
• Assessment of achievements and goals
• Evaluation of life's meaning and purpose
• Consideration of remaining time
• Legacy planning thoughts

**Career Transition:**
• Retirement planning acceleration
• Career wind-down strategies
• Mentoring younger colleagues
• Industry leadership roles

**Relationship Evolution:**
• Long-term partnership deepening
• Grandparent role possibilities
• Friendship circle refinement
• Family wisdom-keeper position

**How Birth Time Affects Timing**

**Morning Birth (6 AM - 12 PM):**
• Saturn Return often begins earlier
• Effects may be more visible externally
• Career changes prominent

**Afternoon Birth (12 PM - 6 PM):**
• Mid-range timing typical
• Balanced internal/external changes
• Relationship focus common

**Evening Birth (6 PM - 12 AM):**
• Saturn Return may start later
• Internal transformation emphasis
• Spiritual growth prominent

**Night Birth (12 AM - 6 AM):**
• Delayed onset possible
• Deep psychological changes
• Hidden transformation periods

**Regional Variations**

Birth location affects exact timing:
• Eastern time zones: Earlier onset
• Western time zones: Later onset
• Southern hemisphere: Seasonal variations
• International moves: Adjusted calculations

**Preparing for Your Saturn Return**

**1-2 Years Before:**
• Begin honest life evaluation
• Identify unsustainable areas
• Start building desired skills
• Strengthen financial foundation

**During the Return:**
• Embrace change rather than resist
• Make decisions aligned with authentic self
• Seek support from mentors or counselors
• Document the transformation process

**After the Return:**
• Integrate lessons learned
• Maintain new structures built
• Share wisdom with others
• Prepare for next life phase

**Using Our Calculator for Precise Timing**

For exact dates personalized to your birth information, use our [Saturn Return Calculator](/calculator). You can also learn about [recognizing the signs](/blog/signs-of-saturn-return) and [understanding the deeper meaning](/blog/meaning-of-saturn-return) of this important transition.

**Signs You're Approaching Saturn Return**

Watch for these indicators:
• Growing restlessness with current situation
• Increased desire for authentic living
• Pressure to make significant commitments
• Questioning of long-held beliefs or goals
• Unusual challenges requiring maturity

**Making the Most of Your Saturn Return**

Rather than fearing this period, approach it as:
• An opportunity for conscious evolution
• A chance to align life with true values
• A period of empowered decision-making
• A foundation-building time for future success`,
    author: 'Cosmic Insights Team',
    date: '2025-06-05',
    readTime: '9 min read',
    category: 'Timing Guide',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80',
    imageAlt: 'Calendar and clock showing Saturn Return timing and life phases',
    tags: ['saturn return timing', 'life phases', 'ages', 'birth year', 'preparation']
  },
  {
    id: 'how-to-use-calculator',
    title: 'How to Use the Saturn Return Calculator',
    excerpt: 'A comprehensive guide to getting accurate results from our Saturn Return calculator.',
    content: `Our Saturn Return Calculator provides precise, personalized insights about your Saturn Return periods.

**Step 1: Gather Your Birth Information**

For accurate calculation, you'll need:
• Birth Date: The exact day, month, and year
• Birth Time: Precise time (hour and minute)
• Birth Location: City and country where you were born
• Current Location: Where you currently live

**Step 2: Enter Your Information**

Navigate to our calculator page:
1. Select your birth date from the calendar
2. Use the time picker to set your birth time
3. Type your birth city and select from dropdown
4. Enter your current city for location-based insights

**Step 3: Review Your Results**

You'll receive:
• Exact Saturn Return Dates
• Duration Information
• Personalized Insights
• Life Phase Analysis

**Tips for Accuracy**

• Obtain exact birth time from birth certificate
• Double-check birth location spelling
• Remember effects can be felt 1-2 years before/after

**Making the Most of Your Results**

Use your calculation for:
• Life Planning: Understanding optimal timing
• Self-Reflection: Gaining insight into life themes
• Personal Growth: Preparing for transformation
• Relationship Timing: Understanding partnership effects

To understand what your results mean, read about [the signs of Saturn Return](/blog/signs-of-saturn-return) and [how to calculate manually](/blog/how-to-calculate-saturn-return).`,
    author: 'Cosmic Insights Team',
    date: '2025-05-20',
    readTime: '4 min read',
    category: 'How-To Guide',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80',
    imageAlt: 'Computer screen showing calculations for Saturn Return Calculator',
    tags: ['calculator', 'how-to', 'saturn return', 'birth chart']
  },
  {
    id: 'signs-of-saturn-return',
    title: 'How Do I Know If I Am Having My Saturn Return?',
    excerpt: 'Recognize the key signs that indicate you\'re experiencing a Saturn Return period.',
    content: `Wondering if you're experiencing your Saturn Return? Here are the key signs that indicate this transformative phase.

**Timeline and Duration**

Saturn Returns don't happen overnight. Effects typically begin 1-2 years before Saturn reaches its exact natal position and continue for 1-2 years afterward.

**Emotional and Psychological Signs**

**Intense Life Questioning**
You find yourself asking: "Is this what I want to be doing?" "Am I on the right path?"

**Feeling Restless or Stuck**
Growing sense that your current situation isn't sustainable.

**Increased Responsibility**
Life demands more of you through career advancement or family obligations.

**Desire for Authenticity**
Compelled to align external life with internal values.

**Practical Life Changes**

Major transitions commonly include:
• Career changes or increased professional responsibility
• Relationship endings or commitments
• Geographic moves or living situation changes
• Educational pursuits or skill development
• Health wake-up calls prompting lifestyle changes

**Age-Related Timing**

**First Saturn Return (Ages 27-30)**
• Quarter-life crisis feelings
• Pressure to "settle down"
• Career establishment anxiety
• Relationship definition needs

**Second Saturn Return (Ages 57-60)**
• Midlife perspective shifts
• Career legacy considerations
• Health and mortality awareness

**Relationship Patterns**

During Saturn Return:
• Partnerships lacking foundation may end
• Commitment-ready relationships may deepen
• Family dynamics shift as you establish boundaries
• Friendships re-evaluated based on authenticity

**How to Confirm You're in Saturn Return**

Use our [Saturn Return Calculator](/calculator) to determine exact timing, or learn [when your Saturn Return occurs](/blog/when-is-my-saturn-return) based on your birth year. If you're experiencing multiple signs and in the right age range, you're likely in this transformative period.`,
    author: 'Cosmic Insights Team',
    date: '2025-05-25',
    readTime: '6 min read',
    category: 'Signs & Symptoms',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    imageAlt: 'Mountain summit representing life transitions and Saturn Return challenges',
    tags: ['signs', 'symptoms', 'saturn return', 'life changes', 'transitions']
  },
  {
    id: 'meaning-of-saturn-return',
    title: 'What Does It Mean If I\'m Having My Saturn Return?',
    excerpt: 'Understand the deeper significance and transformative power of your Saturn Return.',
    content: `If you're experiencing your Saturn Return, you're in one of life's most important astrological transits. Understanding this can transform challenges into growth opportunities.

**The Deeper Meaning**

Saturn Return represents a cosmic "graduation" into a new life phase. Saturn, the "taskmaster" of astrology, asks you to demonstrate what you've learned in 29.5 years.

**Core Themes and Lessons**

**Authenticity Over Approval**
Saturn Return reveals where you've been living to please others rather than honoring your true self.

**Structure and Foundation Building**
Create sustainable life structures in career, relationships, health, and values.

**Accountability and Maturity**
Take full responsibility for your life choices and consequences.

**Quality Over Quantity**
Prune what no longer serves you - relationships, careers, or goals that were never truly yours.

**What's Happening Energetically**

**Karmic Completion**
Saturn Return represents completion of important karmic lessons and preparation for new chapters.

**Initiation into Wisdom**
This period marks initiation into new life wisdom levels.

**Soul Alignment**
Creates pressure forcing alignment between soul's purpose and external life.

**Different Meanings by Life Stage**

**First Saturn Return (Late 20s/Early 30s)**
"Who am I as an adult, and what do I want to build?"
• Establishing adult identity beyond family expectations
• Making long-term career and relationship commitments
• Learning to balance freedom with responsibility

**Second Saturn Return (Late 50s/Early 60s)**
"What wisdom have I gained, and how will I share it?"
• Evaluating life accomplishments and legacy
• Transitioning from building to mentoring
• Deepening spiritual understanding

**How to Work WITH Saturn Return Energy**

**Embrace the Pressure**
Ask: "What is this experience trying to teach me?"

**Make Conscious Choices**
Use this time to make deliberate decisions aligned with your values.

**Invest in Long-Term Growth**
Focus on building skills and relationships that will serve you for decades.

**Trust the Process**
Saturn Return discomfort is temporary but benefits are lasting.

**The Transformative Promise**

You're being invited into a more authentic, responsible, and empowered version of yourself. This isn't just surviving a difficult period—you're actively participating in your transformation.

Learn more about [recognizing the signs](/blog/signs-of-saturn-return) and use our [Saturn Return Calculator](/calculator) to understand your personal timing.`,
    author: 'Cosmic Insights Team',
    date: '2025-05-30',
    readTime: '7 min read',
    category: 'Deep Dive',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80',
    imageAlt: 'Golden lights representing transformation during Saturn Return',
    tags: ['meaning', 'transformation', 'saturn return', 'spiritual growth', 'life purpose']
  }
];

const BlogPostContent: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
  const relatedPostsData = useMemo(() => 
    blogPosts.map(p => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt,
      image: p.image,
      imageAlt: p.imageAlt,
      category: p.category
    })), []
  );

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      <BlogSEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        url={`/blog/${post.id}`}
        publishedTime={post.date}
        author={post.author}
        tags={post.tags}
      />

      <FloatingSaturn size="sm" position="top-16 left-8" delay={0} rotation={-20} variant="purple" />
      <FloatingSaturn size="md" position="bottom-32 right-12" delay={1.5} rotation={15} variant="golden" />

      <div className="cosmic-container relative z-10">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
        >
          ← Back to Blog
        </button>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
            
            <FloatingStarsText starCount={6}>
              <h1 className="text-3xl md:text-4xl cosmic-title mb-4">{post.title}</h1>
            </FloatingStarsText>
            
            <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-6">
              {post.category}
            </div>

            <div className="mb-6 rounded-lg overflow-hidden">
              <OptimizedImage
                src={post.image}
                alt={post.imageAlt}
                className="w-full object-cover"
                priority={true}
                width={800}
                height={400}
              />
            </div>
          </header>

          <AdSenseAd slot="1234567890" format="rectangle" className="max-w-md mx-auto mb-6" />

          <div className="cosmic-card p-6 md:p-8">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (index === 3 && post.content.split('\n\n').length > 6) {
                  return (
                    <React.Fragment key={index}>
                      {renderParagraph(paragraph, index)}
                      <div className="my-4">
                        <AdSenseAd slot="0987654321" format="horizontal" className="max-w-lg mx-auto" />
                      </div>
                    </React.Fragment>
                  );
                }
                return renderParagraph(paragraph, index);
              })}
            </div>
          </div>

          <AdSenseAd slot="1357924680" format="rectangle" className="max-w-md mx-auto mt-6" />
          
          <RelatedPosts currentPostId={post.id} posts={relatedPostsData} />
        </article>
      </div>
    </div>
  );
};

const renderParagraph = (paragraph: string, index: number) => {
  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
    return (
      <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3 sparkling-text">
        {paragraph.replace(/\*\*/g, '')}
      </h3>
    );
  }
  if (paragraph.includes('•')) {
    const items = paragraph.split('\n').filter(item => item.includes('•'));
    return (
      <ul key={index} className="list-none space-y-2 my-4">
        {items.map((item, itemIndex) => (
          <li key={itemIndex} className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>{item.replace('•', '').trim()}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p key={index} className="mb-4 leading-relaxed">
      {paragraph}
    </p>
  );
};

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return <BlogPostContent post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      <BlogSEO
        title="Saturn Return Blog"
        description="Explore insights, guidance, and wisdom about Saturn Return and its transformative power in your life. Expert articles on astrology, life transitions, and personal growth."
        url="/blog"
        tags={['saturn return', 'astrology', 'life transitions', 'personal growth', 'blog']}
      />

      <FloatingSaturn size="sm" position="top-16 left-8" delay={0} rotation={-20} variant="purple" />
      <FloatingSaturn size="md" position="top-32 right-12" delay={1.5} rotation={15} variant="golden" />
      <FloatingSaturn size="sm" position="bottom-40 left-16" delay={2.5} rotation={-10} variant="fiery" />

      <div className="cosmic-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <FloatingStarsText starCount={8} starColor="rgba(135, 206, 250, 0.8)">
            <h1 className="text-3xl md:text-4xl cosmic-title mb-4">Saturn Return Blog</h1>
          </FloatingStarsText>
          <p className="text-lg text-muted-foreground">
            Expert insights and guidance on Saturn Return's transformative power.
          </p>
        </div>

        <AdSenseAd slot="2468135790" format="horizontal" className="max-w-2xl mx-auto mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <article 
                className="cosmic-card overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer" 
                onClick={() => setSelectedPost(post)}
              >
                <div className="overflow-hidden">
                  <OptimizedImage
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={200}
                    lazy={index > 1}
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <div className="inline-block bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium mb-3">
                    {post.category}
                  </div>
                  
                  <h2 className="text-lg font-semibold mb-2 sparkling-text group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-3 leading-relaxed text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </article>

              {(index + 1) % 2 === 0 && index < blogPosts.length - 1 && (
                <div className="md:col-span-2 my-2">
                  <AdSenseAd slot="1122334455" format="horizontal" className="max-w-xl mx-auto" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <AdSenseAd slot="5566778899" format="rectangle" className="max-w-md mx-auto mt-6" />
      </div>
    </div>
  );
};

export default Blog;
