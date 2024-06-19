<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.services";
import { reactive } from "vue";
import SpinnerLoading from "@/components/loaders/spinner.loading.vue";

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email()
      .min(2, { message: "Entrez un email valide" })
      .max(50),
    password: z
      .string()
      .min(2, { message: "le mot de passe est requis" })
      .max(50),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { changePassword } = authService();

// Sign Auth
const state = reactive({
  loading: false,
});
const onSubmit = handleSubmit(async (values) => {
  state.loading = true;
  changePassword(values.email, values.password)
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
    <div class="fixed inset-0">
      <img
        class="w-full h-full object-cover"
        src="https://img.freepik.com/photos-gratuite/cadre-bureau-table_23-2148148326.jpg?t=st=1718712078~exp=1718715678~hmac=12260c1125fd2105c0afb02e35fc753a0ba9887b449688937f416cf6874c75e5&w=740"
        alt=""
      />
    </div>
    <div class="h-[100vh] w-[100vw] bg-blue-500/70 fixed inset-0"></div>

    <div class="flex h-full w-full">
      <div class="w-8/12 z-40 hidden lg:flex">
        <img
          class="w-full h-full object-contain"
          src="/images/PUB3.jpg"
          alt=""
        />
      </div>

      <Tabs
        default-value="account"
        class="lg:w-4/12 w-11/12 h-full z-40 m-auto bg-white"
      >
        <TabsContent value="account">
          <form class="w-full space-y-1 flex flex-row" @submit="onSubmit">
            <div class="flex flex-col w-full">
              <CardHeader>
                <CardTitle class="flex flex-col justify-center items-center">
                  <div class="">
                    <img class="h-24" src="/images/logo/tms.jpeg" alt="" />
                  </div>
                  <span class="text-xl opacity-90"
                    >Changer votre mot de passe</span
                  >
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-2">
                <FormField v-slot="{ componentField }" name="email">
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="infos@usimeca.ci"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage class="text-xs" />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password">
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Votre mot de passe securisé"
                        v-bind="componentField"
                      />
                    </FormControl>

                    <FormMessage class="text-xs" />
                  </FormItem>
                </FormField>
              </CardContent>
              <CardFooter>
                <Button class="w-full font-bold">
                  <SpinnerLoading size="w-5 h-5" v-if="state.loading" />
                  <span class="text-base" v-if="!state.loading"
                    >Enregistre</span
                  >
                </Button>
                
                <RouterLink :to="{name: 'SignIn'}" class="w-full" >
                  <Button class="w-full font-bold bg-gray-200 text-gray-800 hover:bg-gray-300">
                  <span class="text-sm font-semibold" 
                    >Retourner à la connexion</span
                  >
                </Button>
                </RouterLink>

              </CardFooter>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="password"> </TabsContent>
      </Tabs>
    </div>
  </section>
</template>
