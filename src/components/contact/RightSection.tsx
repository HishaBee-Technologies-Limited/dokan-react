import React from 'react'
import Card from '@/components/common/Card'
import { Text } from '@/components/common/text'
import FallBackImage from '@/components/common/FallBackImage'

export const RightSection = () => {
    return (
        <Card className='h-full lg:w-8/12'>
            <div className="px-space16 my-space8">
                <div className="border-b border-primary-20 dark:border-primary-80 py-space8">
                    <div className="flex items-center gap-space8">
                        <FallBackImage src='' fallback='MM' />
                        <article>
                            <Text title='নিজাম উদ্দিন' className='!text-lg font-medium' />
                            <Text title='Customer  ।  01514252525 | abc@mail.com' variant='muted' />
                        </article>
                    </div>
                </div>
            </div>

            <div className="h-[calc(100%-9rem)] overflow-y-scroll pb-space16">Table

            </div>
        </Card>
    )
}