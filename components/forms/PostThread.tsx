"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useState } from "react";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });
// State variables for checkboxes
const [isChecked1, setIsChecked1] = useState(false);
const [isChecked2, setIsChecked2] = useState(false);
 // Checkbox change handlers
 const handleCheckbox1Change = () => {
  setIsChecked1(!isChecked1);
 
};

const handleCheckbox2Change = () => {
  setIsChecked2(!isChecked2);
  
};
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
      checkbox1: isChecked1,
      checkbox2: isChecked2,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Content
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  <div className="flex text-white font-light flex-row gap-2 items-center">
          <input
            type="checkbox"
            id="checkbox1"
            checked={isChecked1}
            onChange={handleCheckbox1Change}
          />
          <label htmlFor="checkbox1">Enable personal Chat</label>
          <span className="info-icon" title=" Enables private messaging among your users">ℹ️</span> {/* Info icon */}
          
        </div>
        <div className="flex text-white flex-row gap-2 items-center">
          <input
            type="checkbox"
            id="checkbox2"
            checked={isChecked2}
            onChange={handleCheckbox2Change}
          />
          <label htmlFor="checkbox2">Enable interaction on your post</label>
          <span  className="info-icon" title=" Enables functionalities such as liking, commenting, and sharing">ℹ️</span>
        </div>

        <Button type='submit' className='bg-primary-500'>
          Lets Go
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
