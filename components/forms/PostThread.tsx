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
import { useState, useEffect } from "react";

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
      file:"",
    },
  });

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
  
          fileReader.readAsDataURL(file);
  
          fileReader.onload = () => {
            resolve(fileReader.result as string);
          };
  
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      toBase64(file)
        .then((base64String: string | unknown) => {
          setBase64(base64String as string);
        })
        .catch((error) => {
         // console.error("Error converting file to base64:", error);
        });
    }
  }, [file]);

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
     // Ensure base64 is not null before passing it to createThread
  const checkbox2Value = base64 || ''; // Provide a default value if base64 is null
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
      checkbox1: isChecked1,
      checkbox2: checkbox2Value, // Changed from values.file to base64
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
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Upload Images or Videos
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500'>
          Lets Go
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
