import type { Block } from 'payload'

import { buttonGroup, htmlField, optionalText, optionalUpload } from './shared/fields'

export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  labels: { singular: 'Home Hero', plural: 'Home Heroes' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    optionalText('description', 'Description', true),
    buttonGroup('button'),
    { name: 'bannerVideo', type: 'text', label: 'Banner Video URL' },
    optionalUpload('bannerImage', 'Banner Image'),
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'title', type: 'text' }],
    },
    {
      name: 'clientLogos',
      type: 'array',
      fields: [optionalUpload('image', 'Logo')],
    },
    optionalText('clientSliderTitle', 'Client Slider Title'),
    optionalText('shortDescription', 'Short Description'),
  ],
}

export const ProjectAccordion: Block = {
  slug: 'projectAccordion',
  interfaceName: 'ProjectAccordionBlock',
  labels: { singular: 'Project Accordion', plural: 'Project Accordions' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'accordions',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('projectImage', 'Project Image'),
        buttonGroup('button'),
      ],
    },
  ],
}

export const WhyNotionhive: Block = {
  slug: 'whyNotionhive',
  interfaceName: 'WhyNotionhiveBlock',
  labels: { singular: 'Why Notionhive', plural: 'Why Notionhive Sections' },
  fields: [
    optionalText('title', 'Title'),
    optionalUpload('centerIcon', 'Center Icon'),
    {
      name: 'cards',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('icon', 'Icon'),
      ],
    },
  ],
}

export const ServiceGrid: Block = {
  slug: 'serviceGrid',
  interfaceName: 'ServiceGridBlock',
  labels: { singular: 'Service Grid', plural: 'Service Grids' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Alternate', value: 'alt' },
        { label: 'Simple', value: 'simple' },
      ],
    },
    optionalText('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    optionalText('customClass', 'Custom CSS Class'),
    buttonGroup('button'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('subtitle', 'Subtitle'),
        optionalText('description', 'Description', true),
        optionalText('buttonTitle', 'Button Title'),
        optionalText('url', 'URL'),
      ],
    },
  ],
}

export const OurProcessBlock: Block = {
  slug: 'ourProcessBlock',
  interfaceName: 'OurProcessBlockBlock',
  labels: { singular: 'Our Process (Home)', plural: 'Our Process (Home)' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'cards',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

export const UspTable: Block = {
  slug: 'uspTable',
  interfaceName: 'UspTableBlock',
  labels: { singular: 'USP Table', plural: 'USP Tables' },
  fields: [
    optionalText('tableTitle', 'Table Title'),
    optionalUpload('logo', 'Logo'),
    {
      name: 'columns',
      type: 'array',
      fields: [{ name: 'label', type: 'text' }],
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        optionalText('feature', 'Feature'),
        optionalText('notionhive', 'Notionhive'),
        optionalText('inhouse', 'In-house'),
        optionalText('freelancers', 'Freelancers'),
      ],
    },
  ],
}

export const NumbersSection: Block = {
  slug: 'numbersSection',
  interfaceName: 'NumbersSectionBlock',
  labels: { singular: 'Numbers Section', plural: 'Numbers Sections' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'cards',
      type: 'array',
      fields: [
        optionalText('count', 'Count'),
        optionalText('prefix', 'Prefix'),
        optionalText('description', 'Description'),
      ],
    },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlockBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Slider', value: 'slider' },
      ],
    },
    optionalText('title', 'Title'),
    optionalText('customClass', 'Custom CSS Class'),
    buttonGroup('button'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('description', 'Description', true),
        optionalText('name', 'Name'),
        optionalText('position', 'Position'),
        optionalUpload('image', 'Image'),
      ],
    },
  ],
}

export const ContactUsSection: Block = {
  slug: 'contactUsSection',
  interfaceName: 'ContactUsSectionBlock',
  labels: { singular: 'Contact Us Section', plural: 'Contact Us Sections' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'listItems',
      type: 'array',
      fields: [{ name: 'listText', type: 'text', label: 'List Item' }],
    },
  ],
}

export const LevelUpCTA: Block = {
  slug: 'levelUpCTA',
  interfaceName: 'LevelUpCTABlock',
  labels: { singular: 'Level Up CTA', plural: 'Level Up CTAs' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    buttonGroup('button'),
    optionalUpload('image', 'Image'),
  ],
}

export const CaseStudiesBlock: Block = {
  slug: 'caseStudiesBlock',
  interfaceName: 'CaseStudiesBlockBlock',
  labels: { singular: 'Case Studies', plural: 'Case Studies Blocks' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured', value: 'featured' },
        { label: 'Slider', value: 'slider' },
        { label: 'All', value: 'all' },
      ],
    },
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('viewMoreText', 'View More Text'),
    optionalText('viewMoreUrl', 'View More URL'),
    optionalText('customClass', 'Custom CSS Class'),
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'caseStudy',
          type: 'relationship',
          relationTo: 'our-work',
        },
      ],
    },
  ],
}

export const OurApproach: Block = {
  slug: 'ourApproach',
  interfaceName: 'OurApproachBlock',
  labels: { singular: 'Our Approach', plural: 'Our Approach Sections' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('viewMoreText', 'View More Text'),
    optionalText('viewMoreUrl', 'View More URL'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('itemDescription', 'Description', true),
      ],
    },
  ],
}

export const BrandsBlock: Block = {
  slug: 'brandsBlock',
  interfaceName: 'BrandsBlockBlock',
  labels: { singular: 'Brands', plural: 'Brands Blocks' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Slider', value: 'slider' },
      ],
    },
    optionalText('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    optionalText('customClass', 'Custom CSS Class'),
    buttonGroup('button'),
    {
      name: 'items',
      type: 'array',
      fields: [optionalUpload('image', 'Brand Logo')],
    },
  ],
}

export const ServiceDetailsBanner: Block = {
  slug: 'serviceDetailsBanner',
  interfaceName: 'ServiceDetailsBannerBlock',
  labels: { singular: 'Service Details Banner', plural: 'Service Details Banners' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalUpload('image', 'Image'),
    optionalText('viewMoreText', 'View More Text'),
    optionalText('viewMoreUrl', 'View More URL'),
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
  ],
}

export const BusinessBlock: Block = {
  slug: 'businessBlock',
  interfaceName: 'BusinessBlockBlock',
  labels: { singular: 'Grow Business', plural: 'Grow Business Sections' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('buttonText', 'Button Text'),
    optionalUpload('image', 'Image'),
    optionalText('customClass', 'Custom CSS Class'),
  ],
}

export const PageBanner: Block = {
  slug: 'pageBanner',
  interfaceName: 'PageBannerBlock',
  labels: { singular: 'Page Banner', plural: 'Page Banners' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    optionalText('pageTitle', 'Page Title'),
    optionalUpload('image', 'Image'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
  ],
}

export const TitleWithTabs: Block = {
  slug: 'titleWithTabs',
  interfaceName: 'TitleWithTabsBlock',
  labels: { singular: 'Title With Tabs', plural: 'Title With Tabs' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
    {
      name: 'tabs',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

export const BookConsultation: Block = {
  slug: 'bookConsultation',
  interfaceName: 'BookConsultationBlock',
  labels: { singular: 'Book Consultation', plural: 'Book Consultation' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    { name: 'iframe', type: 'text', label: 'Calendly Embed URL' },
  ],
}

export const AboutUsStrategy: Block = {
  slug: 'aboutUsStrategy',
  interfaceName: 'AboutUsStrategyBlock',
  labels: { singular: 'About Us Strategy', plural: 'About Us Strategy' },
  fields: [
    htmlField('description', 'Description'),
    {
      name: 'numbers',
      type: 'array',
      fields: [
        optionalText('count', 'Count'),
        optionalText('prefix', 'Prefix'),
        optionalText('title', 'Title'),
      ],
    },
  ],
}

export const OurStory: Block = {
  slug: 'ourStory',
  interfaceName: 'OurStoryBlock',
  labels: { singular: 'Our Story', plural: 'Our Story' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('subtitle', 'Subtitle'),
    {
      name: 'yearItems',
      type: 'array',
      fields: [
        optionalText('year', 'Year'),
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('image', 'Image'),
      ],
    },
  ],
}

export const AwardsRecognition: Block = {
  slug: 'awardsRecognition',
  interfaceName: 'AwardsRecognitionBlock',
  labels: { singular: 'Awards Recognition', plural: 'Awards Recognition' },
  fields: [
    optionalUpload('image', 'Image'),
    optionalText('title', 'Title'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

export const OurClients: Block = {
  slug: 'ourClients',
  interfaceName: 'OurClientsBlock',
  labels: { singular: 'Our Clients', plural: 'Our Clients' },
  fields: [
    {
      name: 'clients',
      type: 'array',
      fields: [
        optionalText('name', 'Name'),
        optionalUpload('logo', 'Logo'),
      ],
    },
  ],
}

export const JoinOurTeam: Block = {
  slug: 'joinOurTeam',
  interfaceName: 'JoinOurTeamBlock',
  labels: { singular: 'Join Our Team', plural: 'Join Our Team' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalUpload('imageOne', 'Image One'),
    optionalUpload('imageTwo', 'Image Two'),
    buttonGroup('button'),
  ],
}

export const CaseStudiesBanner: Block = {
  slug: 'caseStudiesBanner',
  interfaceName: 'CaseStudiesBannerBlock',
  labels: { singular: 'Case Studies Banner', plural: 'Case Studies Banners' },
  fields: [optionalText('title', 'Title')],
}

export const AllCaseStudies: Block = {
  slug: 'allCaseStudies',
  interfaceName: 'AllCaseStudiesBlock',
  labels: { singular: 'All Case Studies', plural: 'All Case Studies' },
  fields: [],
}

export const WorkTogether: Block = {
  slug: 'workTogether',
  interfaceName: 'WorkTogetherBlock',
  labels: { singular: 'Work Together', plural: 'Work Together' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('primaryButtonTitle', 'Primary Button Title'),
    optionalText('primaryButtonUrl', 'Primary Button URL'),
    optionalText('secondaryButtonTitle', 'Secondary Button Title'),
    optionalText('secondaryButtonUrl', 'Secondary Button URL'),
  ],
}

export const CaseSummary: Block = {
  slug: 'caseSummary',
  interfaceName: 'CaseSummaryBlock',
  labels: { singular: 'Case Summary', plural: 'Case Summaries' },
  fields: [
    optionalText('year', 'Year'),
    optionalText('industry', 'Industry'),
    optionalText('teamInvolvement', 'Team Involvement'),
    optionalText('servicesWeProvided', 'Services Provided'),
    optionalText('description', 'Description', true),
    buttonGroup('button'),
  ],
}

export const CaseDetails: Block = {
  slug: 'caseDetails',
  interfaceName: 'CaseDetailsBlock',
  labels: { singular: 'Case Details', plural: 'Case Details' },
  fields: [
    optionalUpload('bannerImage', 'Banner Image'),
    optionalText('subtitle', 'Subtitle'),
    htmlField('description', 'Description'),
    {
      name: 'gallery',
      type: 'array',
      fields: [optionalUpload('image', 'Image')],
    },
    {
      name: 'project',
      type: 'array',
      fields: [
        optionalText('count', 'Count'),
        optionalText('prefix', 'Prefix'),
        optionalText('title', 'Title'),
      ],
    },
    optionalUpload('fullWidthImageTwo', 'Full Width Image'),
    { name: 'youtubeVideoLink', type: 'text', label: 'YouTube Video URL' },
    {
      name: 'galleryTwo',
      type: 'array',
      fields: [
        optionalUpload('image', 'Image'),
        optionalText('description', 'Description', true),
      ],
    },
    htmlField('descriptionTwo', 'Description Two'),
  ],
}

export const IncludedServices: Block = {
  slug: 'includedServices',
  interfaceName: 'IncludedServicesBlock',
  labels: { singular: 'Included Services', plural: 'Included Services' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
    {
      name: 'services',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('subtitle', 'Subtitle'),
        optionalUpload('image', 'Image'),
        htmlField('description', 'Description'),
      ],
    },
  ],
}

export const IndustryExperience: Block = {
  slug: 'industryExperience',
  interfaceName: 'IndustryExperienceBlock',
  labels: { singular: 'Industry Experience', plural: 'Industry Experience' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

export const OurProcess: Block = {
  slug: 'ourProcess',
  interfaceName: 'OurProcessBlock',
  labels: { singular: 'Our Process', plural: 'Our Process' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
      ],
    },
  ],
}

export const LifeAtNH: Block = {
  slug: 'lifeAtNH',
  interfaceName: 'LifeAtNHBlock',
  labels: { singular: 'Life at Notionhive', plural: 'Life at Notionhive' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    optionalText('shortDescription', 'Short Description'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        optionalText('description', 'Description', true),
        optionalUpload('image', 'Image'),
        buttonGroup('button'),
      ],
    },
  ],
}

export const FeaturedBlogPost: Block = {
  slug: 'featuredBlogPost',
  interfaceName: 'FeaturedBlogPostBlock',
  labels: { singular: 'Featured Blog Post', plural: 'Featured Blog Posts' },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'blogs',
    },
  ],
}

export const BlogPosts: Block = {
  slug: 'blogPosts',
  interfaceName: 'BlogPostsBlock',
  labels: { singular: 'Blog Posts', plural: 'Blog Posts List' },
  fields: [
    {
      name: 'excludePosts',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: true,
    },
  ],
}

export const ProjectDiscussion: Block = {
  slug: 'projectDiscussion',
  interfaceName: 'ProjectDiscussionBlock',
  labels: { singular: 'Project Discussion', plural: 'Project Discussion' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('buttonTitle', 'Button Title'),
    optionalText('buttonUrl', 'Button URL'),
  ],
}

export const OfficeAddress: Block = {
  slug: 'officeAddress',
  interfaceName: 'OfficeAddressBlock',
  labels: { singular: 'Office Address', plural: 'Office Address' },
  fields: [
    optionalText('title', 'Title'),
    optionalUpload('image', 'Image'),
    {
      name: 'addresses',
      type: 'array',
      fields: [
        optionalText('title', 'Title'),
        htmlField('address', 'Address'),
        { name: 'googleMapUrl', type: 'text', label: 'Google Map URL' },
      ],
    },
  ],
}

export const AwardsBlock: Block = {
  slug: 'awardsBlock',
  interfaceName: 'AwardsBlockBlock',
  labels: { singular: 'Awards', plural: 'Awards' },
  fields: [
    optionalText('title', 'Title'),
    optionalText('description', 'Description', true),
    {
      name: 'items',
      type: 'array',
      fields: [
        optionalUpload('image', 'Image'),
        optionalText('title', 'Title'),
      ],
    },
  ],
}

export const VideoTestimonial: Block = {
  slug: 'videoTestimonial',
  interfaceName: 'VideoTestimonialBlock',
  labels: { singular: 'Video Testimonial', plural: 'Video Testimonials' },
  fields: [
    {
      name: 'videos',
      type: 'array',
      fields: [
        { name: 'videoUrl', type: 'text', label: 'Video URL' },
        optionalText('title', 'Title'),
      ],
    },
  ],
}

export const RichContent: Block = {
  slug: 'richContent',
  interfaceName: 'RichContentBlock',
  labels: { singular: 'Rich Content', plural: 'Rich Content' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}

export const notionhiveBlocks = [
  HomeHero,
  ProjectAccordion,
  WhyNotionhive,
  ServiceGrid,
  OurProcessBlock,
  UspTable,
  NumbersSection,
  TestimonialsBlock,
  ContactUsSection,
  LevelUpCTA,
  CaseStudiesBlock,
  OurApproach,
  BrandsBlock,
  ServiceDetailsBanner,
  BusinessBlock,
  PageBanner,
  TitleWithTabs,
  BookConsultation,
  AboutUsStrategy,
  OurStory,
  AwardsRecognition,
  OurClients,
  JoinOurTeam,
  CaseStudiesBanner,
  AllCaseStudies,
  WorkTogether,
  CaseSummary,
  CaseDetails,
  IncludedServices,
  IndustryExperience,
  OurProcess,
  LifeAtNH,
  FeaturedBlogPost,
  BlogPosts,
  ProjectDiscussion,
  OfficeAddress,
  AwardsBlock,
  VideoTestimonial,
  RichContent,
]
