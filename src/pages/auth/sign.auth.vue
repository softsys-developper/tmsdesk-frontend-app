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
        <!-- <img
          class="w-full h-full object-contain"
          src="/images/PUB3.jpg"
          alt=""
        /> -->
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
                  <div class="text-6xl font-black text-blue-500">
                    <!-- <img class="h-24" src="/images/logo/tms.jpeg" alt="" /> -->
                     USIMECA
                  </div>
                  <span class="text-xl opacity-90">Se connecter</span>
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-2">
                <FormField v-slot="{ componentField }" name="email">
                  <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="infos@tmsdesk.com"
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

                  <!-- Forget Password -->
                  <RouterLink
                    :to="{ name: 'SignEmail' }"
                    class="flex justify-between"
                  >
                    <span class=""></span>
                    <span class="underline text-sm"
                      >Mot de passe oublier ?</span
                    >
                  </RouterLink>
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
            </div>
          </form>
        </TabsContent>
        <TabsContent value="password"> </TabsContent>
      </Tabs>
    </div>
  </section>
</template>
