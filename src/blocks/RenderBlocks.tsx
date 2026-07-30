import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import {
  AboutUsStrategyBlock,
  AllCaseStudiesBlock,
  AwardsBlockBlock,
  AwardsRecognitionBlock,
  BlogPostsBlock,
  BookConsultationBlock,
  BrandsBlockBlock,
  BusinessBlockBlock,
  CaseDetailsBlock,
  CaseStudiesBannerBlock,
  CaseStudiesBlockBlock,
  CaseSummaryBlock,
  ContactUsSectionBlock,
  FeaturedBlogPostBlock,
  HomeHeroBlock,
  IncludedServicesBlock,
  IndustryExperienceBlock,
  JoinOurTeamBlock,
  LevelUpCTABlock,
  NumbersSectionBlock,
  OfficeAddressBlock,
  OurApproachBlock,
  OurProcessBlock,
  OurProcessBlockBlock,
  OurStoryBlock,
  PageBannerBlock,
  ProjectAccordionBlock,
  ProjectDiscussionBlock,
  RichContentBlock,
  ServiceDetailsBannerBlock,
  ServiceGridBlock,
  TestimonialsBlockBlock,
  TitleWithTabsBlock,
  UspTableBlock,
  VideoTestimonialBlock,
  WhyNotionhiveBlock,
  WorkTogetherBlock,
} from './notionhive/components/blocks'

const blockComponents = {
  homeHero: HomeHeroBlock,
  projectAccordion: ProjectAccordionBlock,
  whyNotionhive: WhyNotionhiveBlock,
  serviceGrid: ServiceGridBlock,
  ourProcessBlock: OurProcessBlockBlock,
  uspTable: UspTableBlock,
  numbersSection: NumbersSectionBlock,
  testimonialsBlock: TestimonialsBlockBlock,
  contactUsSection: ContactUsSectionBlock,
  levelUpCTA: LevelUpCTABlock,
  caseStudiesBlock: CaseStudiesBlockBlock,
  ourApproach: OurApproachBlock,
  brandsBlock: BrandsBlockBlock,
  serviceDetailsBanner: ServiceDetailsBannerBlock,
  businessBlock: BusinessBlockBlock,
  pageBanner: PageBannerBlock,
  titleWithTabs: TitleWithTabsBlock,
  bookConsultation: BookConsultationBlock,
  aboutUsStrategy: AboutUsStrategyBlock,
  ourStory: OurStoryBlock,
  awardsRecognition: AwardsRecognitionBlock,
  ourClients: BrandsBlockBlock,
  joinOurTeam: JoinOurTeamBlock,
  caseStudiesBanner: CaseStudiesBannerBlock,
  allCaseStudies: AllCaseStudiesBlock,
  workTogether: WorkTogetherBlock,
  caseSummary: CaseSummaryBlock,
  caseDetails: CaseDetailsBlock,
  includedServices: IncludedServicesBlock,
  industryExperience: IndustryExperienceBlock,
  ourProcess: OurProcessBlock,
  lifeAtNH: JoinOurTeamBlock,
  featuredBlogPost: FeaturedBlogPostBlock,
  blogPosts: BlogPostsBlock,
  projectDiscussion: ProjectDiscussionBlock,
  officeAddress: OfficeAddressBlock,
  awardsBlock: AwardsBlockBlock,
  videoTestimonial: VideoTestimonialBlock,
  richContent: RichContentBlock,
}

export type LayoutBlock = NonNullable<Page['layout']>[number]

export const RenderBlocks: React.FC<{
  blocks: LayoutBlock[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
