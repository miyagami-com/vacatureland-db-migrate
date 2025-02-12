export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      discounts: {
        Row: {
          code: string | null
          created_at: string
          id: number
          name: string | null
          percentage: number
          quantity: number | null
          type: Database["public"]["Enums"]["enum_discount_type"]
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: number
          name?: string | null
          percentage: number
          quantity?: number | null
          type: Database["public"]["Enums"]["enum_discount_type"]
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: number
          name?: string | null
          percentage?: number
          quantity?: number | null
          type?: Database["public"]["Enums"]["enum_discount_type"]
        }
        Relationships: []
      }
      employers: {
        Row: {
          about_image: string | null
          average_age: string | null
          benefits: Json[] | null
          career_page: string | null
          culture_description: string | null
          description: string
          dresscode: string | null
          email: string | null
          enum_employee_counts:
            | Database["public"]["Enums"]["enum_emp_count"]
            | null
          facebook_url: string | null
          gender_distribution: string | null
          id: number
          images: string[]
          instagram_url: string | null
          kvk_number: string | null
          linkedin_url: string | null
          location: string | null
          logo: string | null
          name: string | null
          news_url: string | null
          sector: string | null
          spotify_url: string | null
          tiktok_url: string | null
          user_id: number | null
          values: string[] | null
          values_description: string[] | null
          vat_number: string | null
          video: string | null
          view_count: number | null
          website_url: string | null
          x_url: string | null
          year_created: number | null
        }
        Insert: {
          about_image?: string | null
          average_age?: string | null
          benefits?: Json[] | null
          career_page?: string | null
          culture_description?: string | null
          description: string
          dresscode?: string | null
          email?: string | null
          enum_employee_counts?:
            | Database["public"]["Enums"]["enum_emp_count"]
            | null
          facebook_url?: string | null
          gender_distribution?: string | null
          id?: number
          images?: string[]
          instagram_url?: string | null
          kvk_number?: string | null
          linkedin_url?: string | null
          location?: string | null
          logo?: string | null
          name?: string | null
          news_url?: string | null
          sector?: string | null
          spotify_url?: string | null
          tiktok_url?: string | null
          user_id?: number | null
          values?: string[] | null
          values_description?: string[] | null
          vat_number?: string | null
          video?: string | null
          view_count?: number | null
          website_url?: string | null
          x_url?: string | null
          year_created?: number | null
        }
        Update: {
          about_image?: string | null
          average_age?: string | null
          benefits?: Json[] | null
          career_page?: string | null
          culture_description?: string | null
          description?: string
          dresscode?: string | null
          email?: string | null
          enum_employee_counts?:
            | Database["public"]["Enums"]["enum_emp_count"]
            | null
          facebook_url?: string | null
          gender_distribution?: string | null
          id?: number
          images?: string[]
          instagram_url?: string | null
          kvk_number?: string | null
          linkedin_url?: string | null
          location?: string | null
          logo?: string | null
          name?: string | null
          news_url?: string | null
          sector?: string | null
          spotify_url?: string | null
          tiktok_url?: string | null
          user_id?: number | null
          values?: string[] | null
          values_description?: string[] | null
          vat_number?: string | null
          video?: string | null
          view_count?: number | null
          website_url?: string | null
          x_url?: string | null
          year_created?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_employer_id_5ab95d60ee90c300_fk_accounts_customuser_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      employers_purchases: {
        Row: {
          created_at: string
          employer_id: number | null
          expires_at: string | null
          id: number
          job_post_id: number | null
          pricing_option:
            | Database["public"]["Enums"]["enum_pricing_options"]
            | null
          transaction_amount: number
          user_id: number | null
        }
        Insert: {
          created_at?: string
          employer_id?: number | null
          expires_at?: string | null
          id?: number
          job_post_id?: number | null
          pricing_option?:
            | Database["public"]["Enums"]["enum_pricing_options"]
            | null
          transaction_amount?: number
          user_id?: number | null
        }
        Update: {
          created_at?: string
          employer_id?: number | null
          expires_at?: string | null
          id?: number
          job_post_id?: number | null
          pricing_option?:
            | Database["public"]["Enums"]["enum_pricing_options"]
            | null
          transaction_amount?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employers_purchases_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employers_purchases_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employers_purchases_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts_with_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employers_purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      employers_testimonials: {
        Row: {
          author_name: string | null
          author_role: string | null
          content: string | null
          created_at: string
          employer_id: number | null
          id: number
        }
        Insert: {
          author_name?: string | null
          author_role?: string | null
          content?: string | null
          created_at?: string
          employer_id?: number | null
          id?: number
        }
        Update: {
          author_name?: string | null
          author_role?: string | null
          content?: string | null
          created_at?: string
          employer_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "employer_testimonials_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      job_alerts: {
        Row: {
          id: number
          last_notified_job_posts: number[] | null
          location_radius: string | null
          name: string
          query: string
          search_result_count: number | null
          user_id: number
        }
        Insert: {
          id?: number
          last_notified_job_posts?: number[] | null
          location_radius?: string | null
          name: string
          query: string
          search_result_count?: number | null
          user_id: number
        }
        Update: {
          id?: number
          last_notified_job_posts?: number[] | null
          location_radius?: string | null
          name?: string
          query?: string
          search_result_count?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "search_saved_user_id_7d9bf0280c1ca0d2_fk_accounts_customuser_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_saved_user_id_7d9bf0280c1ca0d2_fk_users_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      job_post_questions: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: number
          job_post_id: number | null
          order: number | null
          question_text: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          job_post_id?: number | null
          order?: number | null
          question_text?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          job_post_id?: number | null
          order?: number | null
          question_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_post_questions_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_post_questions_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts_with_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      job_posts: {
        Row: {
          activated_at: string | null
          apply_email: string | null
          apply_url: string | null
          available_from: string | null
          available_to: string | null
          clickthrough_links: string | null
          company: string | null
          created_at: string
          creator_id: number | null
          cv_reaction_count: number
          employment_start_date: string | null
          external_id: string | null
          hide_recruiter_info: boolean | null
          hours_per_week: number | null
          id: number
          images: string[] | null
          interest_description: string | null
          is_fast_application: boolean
          is_ongoing_publication: boolean
          is_recommended: boolean
          is_social_media: boolean
          job_description: string | null
          job_description_image_url: string | null
          job_place: string | null
          job_place_lat: number | null
          job_place_long: number | null
          job_salary_indication: string | null
          job_title: string
          job_type: number
          job_working_location: string | null
          linkedin_reaction_count: number
          logo: string | null
          order_id: number | null
          picked_company_id: number | null
          profile_description: string | null
          profile_reaction_count: number
          recruiter_email: string | null
          recruiter_image: string | null
          recruiter_name: string | null
          recruiter_phone: string | null
          recruiter_whatsapp_availability: boolean | null
          requirements_description: string | null
          slug: string | null
          started_application_count: number | null
          status: number
          travel_distance: string | null
          updated_at: string
          url_reaction_count: number
          video: string | null
          view_count: number
          work_environment:
            | Database["public"]["Enums"]["enum_work_environment"]
            | null
        }
        Insert: {
          activated_at?: string | null
          apply_email?: string | null
          apply_url?: string | null
          available_from?: string | null
          available_to?: string | null
          clickthrough_links?: string | null
          company?: string | null
          created_at?: string
          creator_id?: number | null
          cv_reaction_count: number
          employment_start_date?: string | null
          external_id?: string | null
          hide_recruiter_info?: boolean | null
          hours_per_week?: number | null
          id?: number
          images?: string[] | null
          interest_description?: string | null
          is_fast_application?: boolean
          is_ongoing_publication?: boolean
          is_recommended: boolean
          is_social_media?: boolean
          job_description?: string | null
          job_description_image_url?: string | null
          job_place?: string | null
          job_place_lat?: number | null
          job_place_long?: number | null
          job_salary_indication?: string | null
          job_title: string
          job_type: number
          job_working_location?: string | null
          linkedin_reaction_count: number
          logo?: string | null
          order_id?: number | null
          picked_company_id?: number | null
          profile_description?: string | null
          profile_reaction_count: number
          recruiter_email?: string | null
          recruiter_image?: string | null
          recruiter_name?: string | null
          recruiter_phone?: string | null
          recruiter_whatsapp_availability?: boolean | null
          requirements_description?: string | null
          slug?: string | null
          started_application_count?: number | null
          status: number
          travel_distance?: string | null
          updated_at?: string
          url_reaction_count: number
          video?: string | null
          view_count: number
          work_environment?:
            | Database["public"]["Enums"]["enum_work_environment"]
            | null
        }
        Update: {
          activated_at?: string | null
          apply_email?: string | null
          apply_url?: string | null
          available_from?: string | null
          available_to?: string | null
          clickthrough_links?: string | null
          company?: string | null
          created_at?: string
          creator_id?: number | null
          cv_reaction_count?: number
          employment_start_date?: string | null
          external_id?: string | null
          hide_recruiter_info?: boolean | null
          hours_per_week?: number | null
          id?: number
          images?: string[] | null
          interest_description?: string | null
          is_fast_application?: boolean
          is_ongoing_publication?: boolean
          is_recommended?: boolean
          is_social_media?: boolean
          job_description?: string | null
          job_description_image_url?: string | null
          job_place?: string | null
          job_place_lat?: number | null
          job_place_long?: number | null
          job_salary_indication?: string | null
          job_title?: string
          job_type?: number
          job_working_location?: string | null
          linkedin_reaction_count?: number
          logo?: string | null
          order_id?: number | null
          picked_company_id?: number | null
          profile_description?: string | null
          profile_reaction_count?: number
          recruiter_email?: string | null
          recruiter_image?: string | null
          recruiter_name?: string | null
          recruiter_phone?: string | null
          recruiter_whatsapp_availability?: boolean | null
          requirements_description?: string | null
          slug?: string | null
          started_application_count?: number | null
          status?: number
          travel_distance?: string | null
          updated_at?: string
          url_reaction_count?: number
          video?: string | null
          view_count?: number
          work_environment?:
            | Database["public"]["Enums"]["enum_work_environment"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "D15640f0c935d27e01cefbaf91a15c62"
            columns: ["picked_company_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_jobof_creator_id_ac3892ccb5c4dd6_fk_accounts_customuser_id"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_jobof_creator_id_ac3892ccb5c4dd6_fk_users_id"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_joboffer_order_id_5f7b029e1090298_fk_orders_order_id"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_order"
            referencedColumns: ["id"]
          },
        ]
      }
      job_posts_tags: {
        Row: {
          content_object_id: number
          created_at: string | null
          id: number
          tag_id: number
        }
        Insert: {
          content_object_id: number
          created_at?: string | null
          id?: number
          tag_id: number
        }
        Update: {
          content_object_id?: number
          created_at?: string | null
          id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "job_posts_tags_content_object_id_fkey"
            columns: ["content_object_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_posts_tags_content_object_id_fkey"
            columns: ["content_object_id"]
            isOneToOne: false
            referencedRelation: "job_posts_with_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_tag_content_object_id_7a5ca13eef643bc6_fk_jobs_joboffer_id"
            columns: ["content_object_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_tag_content_object_id_7a5ca13eef643bc6_fk_jobs_joboffer_id"
            columns: ["content_object_id"]
            isOneToOne: false
            referencedRelation: "job_posts_with_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_taggedj_tag_id_21dd017bfa7750d8_fk_jobs_hierarchicaltag_id"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "jobs_hierarchicaltag"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs_hierarchicaltag: {
        Row: {
          category: string
          code: string
          depth: number
          description: string | null
          id: number
          name: string
          numchild: number
          order: number | null
          path: string
          slug: string
        }
        Insert: {
          category: string
          code: string
          depth: number
          description?: string | null
          id?: number
          name: string
          numchild: number
          order?: number | null
          path: string
          slug: string
        }
        Update: {
          category?: string
          code?: string
          depth?: number
          description?: string | null
          id?: number
          name?: string
          numchild?: number
          order?: number | null
          path?: string
          slug?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          employer_id: number | null
          id: string
          job_post_id: number | null
          order: number | null
          path: string
          type: Database["public"]["Enums"]["enum_media_types"] | null
        }
        Insert: {
          created_at?: string
          employer_id?: number | null
          id?: string
          job_post_id?: number | null
          order?: number | null
          path: string
          type?: Database["public"]["Enums"]["enum_media_types"] | null
        }
        Update: {
          created_at?: string
          employer_id?: number | null
          id?: string
          job_post_id?: number | null
          order?: number | null
          path?: string
          type?: Database["public"]["Enums"]["enum_media_types"] | null
        }
        Relationships: [
          {
            foreignKeyName: "media_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts_with_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          created_at: string
          description: string | null
          employer_id: number | null
          id: number
          image: string | null
          title: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          employer_id?: number | null
          id?: number
          image?: string | null
          title?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          employer_id?: number | null
          id?: number
          image?: string | null
          title?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "news_articles_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "news_articles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_history: {
        Row: {
          content: string
          created_at: string
          group: number
          id: number
          image_url: string | null
          subject: string
        }
        Insert: {
          content: string
          created_at: string
          group: number
          id?: number
          image_url?: string | null
          subject: string
        }
        Update: {
          content?: string
          created_at?: string
          group?: number
          id?: number
          image_url?: string | null
          subject?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          group: number
          has_one_time_activated: boolean
          is_disabled: boolean
          last_name: string | null
        }
        Insert: {
          created_at: string
          email: string
          first_name?: string | null
          group: number
          has_one_time_activated: boolean
          is_disabled: boolean
          last_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          group?: number
          has_one_time_activated?: boolean
          is_disabled?: boolean
          last_name?: string | null
        }
        Relationships: []
      }
      orders_order: {
        Row: {
          created_at: string
          discount_id: number | null
          expires_at: string | null
          id: number
          is_first: boolean
          issue_number: number
          num_offers: number
          number: string
          package: number
          payment_request_id: number | null
          user_id: number
        }
        Insert: {
          created_at: string
          discount_id?: number | null
          expires_at?: string | null
          id?: number
          is_first: boolean
          issue_number: number
          num_offers: number
          number: string
          package: number
          payment_request_id?: number | null
          user_id: number
        }
        Update: {
          created_at?: string
          discount_id?: number | null
          expires_at?: string | null
          id?: number
          is_first?: boolean
          issue_number?: number
          num_offers?: number
          number?: string
          package?: number
          payment_request_id?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "D5fc261f8cd3f12a903301dc1d0c0ddb"
            columns: ["payment_request_id"]
            isOneToOne: true
            referencedRelation: "orders_paymentrequest"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_order_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_order_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_paymentrequest: {
        Row: {
          amount: number
          created_at: string
          credits_added: boolean
          id: number
          invoice_metadata: Json | null
          order_no: string
          payment_id: string | null
          payment_url: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at: string
          credits_added?: boolean
          id?: number
          invoice_metadata?: Json | null
          order_no: string
          payment_id?: string | null
          payment_url?: string | null
          status?: string | null
          updated_at: string
        }
        Update: {
          amount?: number
          created_at?: string
          credits_added?: boolean
          id?: number
          invoice_metadata?: Json | null
          order_no?: string
          payment_id?: string | null
          payment_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          credits_per_month: number
          description: string | null
          features: Json | null
          id: number
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          credits_per_month: number
          description?: string | null
          features?: Json | null
          id?: never
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          credits_per_month?: number
          description?: string | null
          features?: Json | null
          id?: never
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          mollie_customer_id: string
          mollie_subscription_id: string | null
          plan_id: number
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: number
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          mollie_customer_id: string
          mollie_subscription_id?: string | null
          plan_id: number
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: number
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          mollie_customer_id?: string
          mollie_subscription_id?: string | null
          plan_id?: number
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
          slug: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      user_application_answers: {
        Row: {
          answer_text: string | null
          created_at: string | null
          id: number
          question_id: number | null
          user_application_id: number | null
        }
        Insert: {
          answer_text?: string | null
          created_at?: string | null
          id?: number
          question_id?: number | null
          user_application_id?: number | null
        }
        Update: {
          answer_text?: string | null
          created_at?: string | null
          id?: number
          question_id?: number | null
          user_application_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_application_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "job_post_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_application_answers_user_application_id_fkey"
            columns: ["user_application_id"]
            isOneToOne: false
            referencedRelation: "user_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_applications: {
        Row: {
          created_at: string
          cv: string | null
          email: string | null
          experience_years: string | null
          id: number
          job_post_id: number | null
          motivation: string | null
          name: string | null
          notes: string | null
          phone: string | null
          status: Database["public"]["Enums"]["enum_application_status"]
          user_id: number | null
          working_permissions: string | null
        }
        Insert: {
          created_at?: string
          cv?: string | null
          email?: string | null
          experience_years?: string | null
          id?: number
          job_post_id?: number | null
          motivation?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["enum_application_status"]
          user_id?: number | null
          working_permissions?: string | null
        }
        Update: {
          created_at?: string
          cv?: string | null
          email?: string | null
          experience_years?: string | null
          id?: number
          job_post_id?: number | null
          motivation?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["enum_application_status"]
          user_id?: number | null
          working_permissions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_applications_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_applications_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "job_posts_with_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_education: {
        Row: {
          activities_and_societies: string | null
          created_at: string
          education_end_date: string | null
          education_level:
            | Database["public"]["Enums"]["enum_education_level"]
            | null
          education_start_date: string | null
          field: string | null
          id: number
          school: string | null
          user_id: number | null
        }
        Insert: {
          activities_and_societies?: string | null
          created_at?: string
          education_end_date?: string | null
          education_level?:
            | Database["public"]["Enums"]["enum_education_level"]
            | null
          education_start_date?: string | null
          field?: string | null
          id?: number
          school?: string | null
          user_id?: number | null
        }
        Update: {
          activities_and_societies?: string | null
          created_at?: string
          education_end_date?: string | null
          education_level?:
            | Database["public"]["Enums"]["enum_education_level"]
            | null
          education_start_date?: string | null
          field?: string | null
          id?: number
          school?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_education_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_employer_favorites: {
        Row: {
          created_at: string
          employer_id: number | null
          id: number
          is_favorited: boolean
          user_id: number | null
        }
        Insert: {
          created_at?: string
          employer_id?: number | null
          id?: number
          is_favorited?: boolean
          user_id?: number | null
        }
        Update: {
          created_at?: string
          employer_id?: number | null
          id?: number
          is_favorited?: boolean
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_company_favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_employer_favorites_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_job_favorites: {
        Row: {
          created_at: string
          id: number
          is_favorited: boolean
          job_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_favorited?: boolean
          job_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          is_favorited?: boolean
          job_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_job_favorites_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_job_favorites_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts_with_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_job_favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile_details: {
        Row: {
          career_status: string | null
          created_at: string
          current_company: string | null
          current_function: string | null
          current_job_start_date: string | null
          desired_hours_per_week: string | null
          desired_occupation: string | null
          desired_salary: string | null
          desired_sector: string | null
          desired_start_date: string | null
          id: number
          introduction: string | null
          motivation: string | null
          user_id: number
          years_of_experience: string | null
        }
        Insert: {
          career_status?: string | null
          created_at?: string
          current_company?: string | null
          current_function?: string | null
          current_job_start_date?: string | null
          desired_hours_per_week?: string | null
          desired_occupation?: string | null
          desired_salary?: string | null
          desired_sector?: string | null
          desired_start_date?: string | null
          id?: number
          introduction?: string | null
          motivation?: string | null
          user_id: number
          years_of_experience?: string | null
        }
        Update: {
          career_status?: string | null
          created_at?: string
          current_company?: string | null
          current_function?: string | null
          current_job_start_date?: string | null
          desired_hours_per_week?: string | null
          desired_occupation?: string | null
          desired_salary?: string | null
          desired_sector?: string | null
          desired_start_date?: string | null
          id?: number
          introduction?: string | null
          motivation?: string | null
          user_id?: number
          years_of_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_work_experience: {
        Row: {
          created_at: string
          id: number
          job_company: string | null
          job_end_date: string | null
          job_function: string | null
          job_start_date: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          job_company?: string | null
          job_end_date?: string | null
          job_function?: string | null
          job_start_date?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          job_company?: string | null
          job_end_date?: string | null
          job_function?: string | null
          job_start_date?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_work_experience_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          account_type: number | null
          auth_id: string | null
          available_from: string | null
          avatar: string | null
          btw_number: string | null
          city: string | null
          company_name: string | null
          company_type: number
          correspondence_city: string | null
          correspondence_house_number: string | null
          correspondence_province: string | null
          correspondence_street: string | null
          correspondence_zip_code: string | null
          country: string | null
          credits: number
          cv: string | null
          date_joined: string
          date_of_birth: string | null
          description: string | null
          dont_show_reseller: boolean
          education: string | null
          email: string
          first_name: string | null
          full_name: string | null
          has_signed_up_for_newsletter: boolean
          house_number: string | null
          id: number
          is_active: boolean
          is_migrated: boolean | null
          is_staff: boolean
          is_superuser: boolean
          is_verified: boolean
          k_and_k_registration_number: string | null
          last_login: string | null
          last_name: string | null
          linkedin_url: string | null
          logo: string | null
          max_hours_per_week: number | null
          min_hours_per_week: number | null
          motivation_letter: string | null
          notice_period: number | null
          notification_frequency: number
          password: string | null
          phone_number: string | null
          position: string | null
          province: string | null
          street: string | null
          studies: string | null
          username: string
          was_notified: boolean
          website_url: string | null
          zip_code: string | null
        }
        Insert: {
          account_type?: number | null
          auth_id?: string | null
          available_from?: string | null
          avatar?: string | null
          btw_number?: string | null
          city?: string | null
          company_name?: string | null
          company_type: number
          correspondence_city?: string | null
          correspondence_house_number?: string | null
          correspondence_province?: string | null
          correspondence_street?: string | null
          correspondence_zip_code?: string | null
          country?: string | null
          credits: number
          cv?: string | null
          date_joined?: string
          date_of_birth?: string | null
          description?: string | null
          dont_show_reseller?: boolean
          education?: string | null
          email: string
          first_name?: string | null
          full_name?: string | null
          has_signed_up_for_newsletter?: boolean
          house_number?: string | null
          id?: number
          is_active?: boolean
          is_migrated?: boolean | null
          is_staff?: boolean
          is_superuser?: boolean
          is_verified?: boolean
          k_and_k_registration_number?: string | null
          last_login?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          logo?: string | null
          max_hours_per_week?: number | null
          min_hours_per_week?: number | null
          motivation_letter?: string | null
          notice_period?: number | null
          notification_frequency?: number
          password?: string | null
          phone_number?: string | null
          position?: string | null
          province?: string | null
          street?: string | null
          studies?: string | null
          username: string
          was_notified?: boolean
          website_url?: string | null
          zip_code?: string | null
        }
        Update: {
          account_type?: number | null
          auth_id?: string | null
          available_from?: string | null
          avatar?: string | null
          btw_number?: string | null
          city?: string | null
          company_name?: string | null
          company_type?: number
          correspondence_city?: string | null
          correspondence_house_number?: string | null
          correspondence_province?: string | null
          correspondence_street?: string | null
          correspondence_zip_code?: string | null
          country?: string | null
          credits?: number
          cv?: string | null
          date_joined?: string
          date_of_birth?: string | null
          description?: string | null
          dont_show_reseller?: boolean
          education?: string | null
          email?: string
          first_name?: string | null
          full_name?: string | null
          has_signed_up_for_newsletter?: boolean
          house_number?: string | null
          id?: number
          is_active?: boolean
          is_migrated?: boolean | null
          is_staff?: boolean
          is_superuser?: boolean
          is_verified?: boolean
          k_and_k_registration_number?: string | null
          last_login?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          logo?: string | null
          max_hours_per_week?: number | null
          min_hours_per_week?: number | null
          motivation_letter?: string | null
          notice_period?: number | null
          notification_frequency?: number
          password?: string | null
          phone_number?: string | null
          position?: string | null
          province?: string | null
          street?: string | null
          studies?: string | null
          username?: string
          was_notified?: boolean
          website_url?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      whitelabel_groups: {
        Row: {
          id: number
          name: string
          subdomain: string | null
        }
        Insert: {
          id?: number
          name: string
          subdomain?: string | null
        }
        Update: {
          id?: number
          name?: string
          subdomain?: string | null
        }
        Relationships: []
      }
      whitelabel_tags: {
        Row: {
          content_object_id: number | null
          created_at: string
          id: number
          tag_id: number | null
        }
        Insert: {
          content_object_id?: number | null
          created_at?: string
          id?: number
          tag_id?: number | null
        }
        Update: {
          content_object_id?: number | null
          created_at?: string
          id?: number
          tag_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "whitelabel_tags_content_object_id_fkey"
            columns: ["content_object_id"]
            isOneToOne: false
            referencedRelation: "whitelabels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whitelabel_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "jobs_hierarchicaltag"
            referencedColumns: ["id"]
          },
        ]
      }
      whitelabel_themes: {
        Row: {
          about_subheading: string | null
          accent_color: string | null
          background_color: string
          brand_color: string | null
          card_title: string | null
          custom_color: string | null
          description: string | null
          domain: string
          eyebrow_description: string | null
          eyebrow_image: string | null
          eyebrow_title: string | null
          header_gif: string | null
          header_png: string | null
          hero_image_1: string | null
          hero_image_2: string | null
          hero_image_3: string | null
          hero_image_4: string | null
          hero_image_5: string | null
          hero_image_6: string | null
          highlight_color: string | null
          id: number
          keywords: string | null
          link_color: string
          link_hover_color: string
          mission_description_1: string | null
          mission_description_2: string | null
          mission_eyebrow: string | null
          mission_subheading_1: string | null
          name: string
          primary_alt_dark_color: string
          primary_color: string
          primary_dark_color: string
          primary_light_color: string
          primary_panel_color: string
          secondary_color: string
          title: string | null
          welcome_description: string | null
          welcome_description_1: string | null
          welcome_description_2: string | null
          welcome_description_3: string | null
          welcome_description_4: string | null
          welcome_eyebrow: string | null
          welcome_heading: string | null
          welcome_image: string | null
          welcome_subheading_1: string | null
          welcome_subheading_2: string | null
          welcome_subheading_3: string | null
          welcome_subheading_4: string | null
          welcome_title: string | null
        }
        Insert: {
          about_subheading?: string | null
          accent_color?: string | null
          background_color: string
          brand_color?: string | null
          card_title?: string | null
          custom_color?: string | null
          description?: string | null
          domain: string
          eyebrow_description?: string | null
          eyebrow_image?: string | null
          eyebrow_title?: string | null
          header_gif?: string | null
          header_png?: string | null
          hero_image_1?: string | null
          hero_image_2?: string | null
          hero_image_3?: string | null
          hero_image_4?: string | null
          hero_image_5?: string | null
          hero_image_6?: string | null
          highlight_color?: string | null
          id?: number
          keywords?: string | null
          link_color: string
          link_hover_color: string
          mission_description_1?: string | null
          mission_description_2?: string | null
          mission_eyebrow?: string | null
          mission_subheading_1?: string | null
          name: string
          primary_alt_dark_color: string
          primary_color: string
          primary_dark_color: string
          primary_light_color: string
          primary_panel_color: string
          secondary_color?: string
          title?: string | null
          welcome_description?: string | null
          welcome_description_1?: string | null
          welcome_description_2?: string | null
          welcome_description_3?: string | null
          welcome_description_4?: string | null
          welcome_eyebrow?: string | null
          welcome_heading?: string | null
          welcome_image?: string | null
          welcome_subheading_1?: string | null
          welcome_subheading_2?: string | null
          welcome_subheading_3?: string | null
          welcome_subheading_4?: string | null
          welcome_title?: string | null
        }
        Update: {
          about_subheading?: string | null
          accent_color?: string | null
          background_color?: string
          brand_color?: string | null
          card_title?: string | null
          custom_color?: string | null
          description?: string | null
          domain?: string
          eyebrow_description?: string | null
          eyebrow_image?: string | null
          eyebrow_title?: string | null
          header_gif?: string | null
          header_png?: string | null
          hero_image_1?: string | null
          hero_image_2?: string | null
          hero_image_3?: string | null
          hero_image_4?: string | null
          hero_image_5?: string | null
          hero_image_6?: string | null
          highlight_color?: string | null
          id?: number
          keywords?: string | null
          link_color?: string
          link_hover_color?: string
          mission_description_1?: string | null
          mission_description_2?: string | null
          mission_eyebrow?: string | null
          mission_subheading_1?: string | null
          name?: string
          primary_alt_dark_color?: string
          primary_color?: string
          primary_dark_color?: string
          primary_light_color?: string
          primary_panel_color?: string
          secondary_color?: string
          title?: string | null
          welcome_description?: string | null
          welcome_description_1?: string | null
          welcome_description_2?: string | null
          welcome_description_3?: string | null
          welcome_description_4?: string | null
          welcome_eyebrow?: string | null
          welcome_heading?: string | null
          welcome_image?: string | null
          welcome_subheading_1?: string | null
          welcome_subheading_2?: string | null
          welcome_subheading_3?: string | null
          welcome_subheading_4?: string | null
          welcome_title?: string | null
        }
        Relationships: []
      }
      whitelabels: {
        Row: {
          description: string
          facebook_url: string | null
          group_id: number
          id: number
          instagram_url: string | null
          is_active: boolean
          linkedin_url: string | null
          title: string
          twitter_x_url: string | null
          url: string
          whitelabel_theme_id: number | null
        }
        Insert: {
          description: string
          facebook_url?: string | null
          group_id: number
          id?: number
          instagram_url?: string | null
          is_active: boolean
          linkedin_url?: string | null
          title: string
          twitter_x_url?: string | null
          url: string
          whitelabel_theme_id?: number | null
        }
        Update: {
          description?: string
          facebook_url?: string | null
          group_id?: number
          id?: number
          instagram_url?: string | null
          is_active?: boolean
          linkedin_url?: string | null
          title?: string
          twitter_x_url?: string | null
          url?: string
          whitelabel_theme_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "links_link_group_id_397732dbfa94cffe_fk_links_linkgroup_id"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "whitelabel_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whitelabels_group_id_397732dbfa94cffe_fk_whitelabelsgroup_id"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "whitelabel_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whitelabels_whitelabel_theme_id_fkey"
            columns: ["whitelabel_theme_id"]
            isOneToOne: false
            referencedRelation: "whitelabel_themes"
            referencedColumns: ["id"]
          },
        ]
      }
      xml_feeds_logs: {
        Row: {
          content: string
          created_at: string
          direction: Database["public"]["Enums"]["feed_direction"]
          error_message: string | null
          id: number
          job_count: number
          job_ids: number[]
          processed_at: string | null
          provider: Database["public"]["Enums"]["feed_provider"]
          status: Database["public"]["Enums"]["feed_status"]
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          direction: Database["public"]["Enums"]["feed_direction"]
          error_message?: string | null
          id?: number
          job_count?: number
          job_ids: number[]
          processed_at?: string | null
          provider: Database["public"]["Enums"]["feed_provider"]
          status?: Database["public"]["Enums"]["feed_status"]
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          direction?: Database["public"]["Enums"]["feed_direction"]
          error_message?: string | null
          id?: number
          job_count?: number
          job_ids?: number[]
          processed_at?: string | null
          provider?: Database["public"]["Enums"]["feed_provider"]
          status?: Database["public"]["Enums"]["feed_status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      job_posts_with_tags: {
        Row: {
          activated_at: string | null
          apply_email: string | null
          apply_url: string | null
          available_from: string | null
          available_to: string | null
          clickthrough_links: string | null
          company: string | null
          created_at: string | null
          creator_id: number | null
          cv_reaction_count: number | null
          employment_start_date: string | null
          external_id: string | null
          hide_recruiter_info: boolean | null
          hours_per_week: number | null
          id: number | null
          images: string[] | null
          interest_description: string | null
          is_fast_application: boolean | null
          is_ongoing_publication: boolean | null
          is_recommended: boolean | null
          is_social_media: boolean | null
          job_description: string | null
          job_description_image_url: string | null
          job_place: string | null
          job_place_lat: number | null
          job_place_long: number | null
          job_salary_indication: string | null
          job_title: string | null
          job_type: number | null
          job_working_location: string | null
          linkedin_reaction_count: number | null
          logo: string | null
          order_id: number | null
          picked_company_id: number | null
          profile_description: string | null
          profile_reaction_count: number | null
          recruiter_email: string | null
          recruiter_image: string | null
          recruiter_name: string | null
          recruiter_phone: string | null
          recruiter_whatsapp_availability: boolean | null
          requirements_description: string | null
          slug: string | null
          started_application_count: number | null
          status: number | null
          tag_ids: number[] | null
          travel_distance: string | null
          updated_at: string | null
          url_reaction_count: number | null
          video: string | null
          view_count: number | null
          work_environment:
            | Database["public"]["Enums"]["enum_work_environment"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "D15640f0c935d27e01cefbaf91a15c62"
            columns: ["picked_company_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_jobof_creator_id_ac3892ccb5c4dd6_fk_accounts_customuser_id"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_jobof_creator_id_ac3892ccb5c4dd6_fk_users_id"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_joboffer_order_id_5f7b029e1090298_fk_orders_order_id"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_order"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_all_public_table_names: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
        }[]
      }
      get_column_info: {
        Args: {
          tname: string
        }
        Returns: {
          attname: unknown
          attnotnull: boolean
          is_primary_key: boolean
        }[]
      }
      get_foreign_keys: {
        Args: {
          tname: string
        }
        Returns: {
          table_name: string
          foreign_key: unknown
          constraint_definition: string
        }[]
      }
      get_public_tables: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      get_table_columns: {
        Args: {
          tname: string
        }
        Returns: {
          column_name: string
          is_not_null: boolean
          is_primary_key: boolean
          enum_type: string
          enum_values: string[]
        }[]
      }
      get_types: {
        Args: {
          tname: string
        }
        Returns: {
          column_name: string
          data_type: string
        }[]
      }
      list_public_tables: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
        }[]
      }
      refresh_job_posts_with_tags: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      refresh_materialized_view: {
        Args: {
          view_name: string
        }
        Returns: undefined
      }
      reset_sequences: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      search_job_posts: {
        Args: {
          search_query: string
          tag_ids: number[]
          result_offset: number
          result_limit: number
        }
        Returns: {
          job_title: string
          id: number
        }[]
      }
    }
    Enums: {
      enum_application_status: "in_progress" | "rejected"
      enum_discount_type: "volume" | "code"
      enum_education_level:
        | "PhD"
        | "WO"
        | "HBO"
        | "MBO"
        | "VWO"
        | "HAVO"
        | "LBO/VMBO"
      enum_emp_count:
        | "1 - 10"
        | "11 - 50"
        | "51 - 200"
        | "201 - 1000"
        | "1K - 5K"
        | "5K - 10K"
        | "10K+"
      enum_media_types: "image" | "video"
      enum_pricing_options:
        | "standard_post"
        | "featured_post_for_30_days"
        | "featured_post_for_60_days"
        | "social_media_package"
        | "employer_branding"
        | "ongoing"
      enum_purchase_statuses: "active" | "expired"
      enum_work_education_history_type: "work" | "education"
      enum_work_environment: "hybrid" | "on-site" | "remote"
      feed_direction: "import" | "export"
      feed_provider: "vacatureland" | "jobrapido" | "indeed" | "vonq" | "base"
      feed_status: "pending" | "processing" | "completed" | "failed"
      subscription_status: "active" | "canceled" | "suspended" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
