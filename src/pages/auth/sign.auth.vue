<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/auth.services';
import { reactive } from 'vue';
import SpinnerLoading from '@/components/loaders/spinner.loading.vue';
import { AppService } from '@/services/app.services';

const formSchema = toTypedSchema(
   z.object({
      email: z
         .string()
         .email()
         .min(2, { message: 'Entrez un email valide' })
         .max(50),
      password: z
         .string()
         .min(2, { message: 'le mot de passe est requis' })
         .max(50),
   })
);

const { handleSubmit } = useForm({
   validationSchema: formSchema,
});

const { login: AuthSignIn } = authService();

// Sign Auth
const state = reactive({
   loading: false,
});
const onSubmit = handleSubmit(async (values) => {
   state.loading = true;
   AuthSignIn(values.email, values.password)
      .then((data) => {
         if (data) {
            state.loading = false;
         }
      })
      .catch(() => {
         state.loading = false;
      });
});
</script>

<template>
   <section class="flex justify-center items-center h-[100vh] flex-col gap-8">
      <div class="h-[100vh] w-[100vw] bg-blue-500 fixed inset-0 -z-40"></div>

      <Tabs default-value="account" class="w-[400px]">
         <TabsContent value="account">
            <form class="w-full space-y-1" @submit="onSubmit">
               <Card>
                  <CardHeader>
                     <CardTitle
                        class="flex flex-col justify-center items-center"
                     >
                        <span class="text-4xl font-black">{{AppService().name}}</span>
                        <span class="text-xl">Se connecter</span>
                     </CardTitle>
                     <CardDescription>
                        <!-- Connectez-vous a votre espace d'adminstration {{AppService()}} -->
                     </CardDescription>
                  </CardHeader>
                  <CardContent class="space-y-2">
                     <FormField v-slot="{ componentField }" name="email">
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 type="text"
                                 placeholder="shadcn"
                                 v-bind="componentField"
                              />
                           </FormControl>
                           <FormMessage class="text-xs" />
                        </FormItem>
                     </FormField>

                     <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 type="password"
                                 placeholder="shadcn"
                                 v-bind="componentField"
                              />
                           </FormControl>

                           <!-- Forget Password -->
                           <div class="flex justify-between">
                              <span class=""></span>
                              <span class="underline text-sm"
                                 >Mot de passe oublier ?</span
                              >
                           </div>
                           <FormMessage class="text-xs" />
                        </FormItem>
                     </FormField>
                  </CardContent>
                  <CardFooter>
                     <Button class="w-full font-bold">
                        <SpinnerLoading size="w-5 h-5" v-if="state.loading" />
                        <span class="text-base" v-if="!state.loading"
                           >Se connecter</span
                        >
                     </Button>
                  </CardFooter>
               </Card>
            </form>
         </TabsContent>
         <TabsContent value="password"> </TabsContent>
      </Tabs>
   </section>
</template>
