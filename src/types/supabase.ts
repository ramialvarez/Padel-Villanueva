export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)";
  };
  public: {
    Tables: {
      estadisticas_jugador: {
        Row: {
          games_ganados: number | null;
          games_jugados: number | null;
          games_perdidos: number | null;
          jugador_id: string;
          partidos_ganados: number | null;
          partidos_jugados: number | null;
          partidos_perdidos: number | null;
          sets_ganados: number | null;
          sets_jugados: number | null;
          sets_perdidos: number | null;
          torneos_jugados: number | null;
        };
        Insert: {
          games_ganados?: number | null;
          games_jugados?: number | null;
          games_perdidos?: number | null;
          jugador_id: string;
          partidos_ganados?: number | null;
          partidos_jugados?: number | null;
          partidos_perdidos?: number | null;
          sets_ganados?: number | null;
          sets_jugados?: number | null;
          sets_perdidos?: number | null;
          torneos_jugados?: number | null;
        };
        Update: {
          games_ganados?: number | null;
          games_jugados?: number | null;
          games_perdidos?: number | null;
          jugador_id?: string;
          partidos_ganados?: number | null;
          partidos_jugados?: number | null;
          partidos_perdidos?: number | null;
          sets_ganados?: number | null;
          sets_jugados?: number | null;
          sets_perdidos?: number | null;
          torneos_jugados?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "estadisticas_jugador_jugador_id_fkey";
            columns: ["jugador_id"];
            isOneToOne: true;
            referencedRelation: "jugadores";
            referencedColumns: ["id"];
          }
        ];
      };
      estadisticas_torneo_jugador: {
        Row: {
          cantidad: number | null;
          fase: string;
          id: string;
          jugador_id: string | null;
          torneo_id: string | null;
        };
        Insert: {
          cantidad?: number | null;
          fase: string;
          id?: string;
          jugador_id?: string | null;
          torneo_id?: string | null;
        };
        Update: {
          cantidad?: number | null;
          fase?: string;
          id?: string;
          jugador_id?: string | null;
          torneo_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "estadisticas_torneo_jugador_jugador_id_fkey";
            columns: ["jugador_id"];
            isOneToOne: false;
            referencedRelation: "jugadores";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "estadisticas_torneo_jugador_torneo_id_fkey";
            columns: ["torneo_id"];
            isOneToOne: false;
            referencedRelation: "torneos";
            referencedColumns: ["id"];
          }
        ];
      };
      grupos: {
        Row: {
          id: string;
          nombre: string;
          torneo_id: string;
        };
        Insert: {
          id?: string;
          nombre: string;
          torneo_id: string;
        };
        Update: {
          id?: string;
          nombre?: string;
          torneo_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "grupos_torneo_id_fkey";
            columns: ["torneo_id"];
            isOneToOne: false;
            referencedRelation: "torneos";
            referencedColumns: ["id"];
          }
        ];
      };
      jugadores: {
        Row: {
          categoria: string;
          genero: string;
          id: string;
          imagen: string | null;
          nombre: string;
          observado: boolean | null;
        };
        Insert: {
          categoria: string;
          genero: string;
          id?: string;
          imagen?: string | null;
          nombre: string;
          observado?: boolean | null;
        };
        Update: {
          categoria?: string;
          genero?: string;
          id?: string;
          imagen?: string | null;
          nombre?: string;
          observado?: boolean | null;
        };
        Relationships: [];
      };
      parejas: {
        Row: {
          games_ganados: number | null;
          games_jugados: number | null;
          games_perdidos: number | null;
          grupo_id: string | null;
          id: string;
          jugador_dos: string;
          jugador_uno: string;
          partidos_ganados: number | null;
          partidos_jugados: number | null;
          partidos_perdidos: number | null;
          posicion: number | null;
          puntos: number | null;
          sets_ganados: number | null;
          sets_jugados: number | null;
          sets_perdidos: number | null;
          torneo_id: string;
        };
        Insert: {
          games_ganados?: number | null;
          games_jugados?: number | null;
          games_perdidos?: number | null;
          grupo_id?: string | null;
          id?: string;
          jugador_dos: string;
          jugador_uno: string;
          partidos_ganados?: number | null;
          partidos_jugados?: number | null;
          partidos_perdidos?: number | null;
          posicion?: number | null;
          puntos?: number | null;
          sets_ganados?: number | null;
          sets_jugados?: number | null;
          sets_perdidos?: number | null;
          torneo_id: string;
        };
        Update: {
          games_ganados?: number | null;
          games_jugados?: number | null;
          games_perdidos?: number | null;
          grupo_id?: string | null;
          id?: string;
          jugador_dos?: string;
          jugador_uno?: string;
          partidos_ganados?: number | null;
          partidos_jugados?: number | null;
          partidos_perdidos?: number | null;
          posicion?: number | null;
          puntos?: number | null;
          sets_ganados?: number | null;
          sets_jugados?: number | null;
          sets_perdidos?: number | null;
          torneo_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "parejas_grupo_id_fkey";
            columns: ["grupo_id"];
            isOneToOne: false;
            referencedRelation: "grupos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "parejas_jugador_dos_fkey";
            columns: ["jugador_dos"];
            isOneToOne: false;
            referencedRelation: "jugadores";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "parejas_jugador_uno_fkey";
            columns: ["jugador_uno"];
            isOneToOne: false;
            referencedRelation: "jugadores";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "parejas_torneo_id_fkey";
            columns: ["torneo_id"];
            isOneToOne: false;
            referencedRelation: "torneos";
            referencedColumns: ["id"];
          }
        ];
      };
      partidos: {
        Row: {
          depende_partido1: string | null;
          depende_partido2: string | null;
          dependencia_info: Json | null;
          dependencia_tipo: string | null;
          estado: string;
          fase: string;
          ganador: string | null;
          grupo_id: string | null;
          horario: string | null;
          id: string;
          numero: number;
          numero_bracket: string | null;
          pareja_dos: string | null;
          pareja_uno: string | null;
          set1_dos: number | null;
          set1_uno: number | null;
          set2_dos: number | null;
          set2_uno: number | null;
          supertiebreak_dos: number | null;
          supertiebreak_uno: number | null;
          torneo_id: string;
        };
        Insert: {
          depende_partido1?: string | null;
          depende_partido2?: string | null;
          dependencia_info?: Json | null;
          dependencia_tipo?: string | null;
          estado: string;
          fase: string;
          ganador?: string | null;
          grupo_id?: string | null;
          horario?: string | null;
          id?: string;
          numero: number;
          numero_bracket?: string | null;
          pareja_dos?: string | null;
          pareja_uno?: string | null;
          set1_dos?: number | null;
          set1_uno?: number | null;
          set2_dos?: number | null;
          set2_uno?: number | null;
          supertiebreak_dos?: number | null;
          supertiebreak_uno?: number | null;
          torneo_id: string;
        };
        Update: {
          depende_partido1?: string | null;
          depende_partido2?: string | null;
          dependencia_info?: Json | null;
          dependencia_tipo?: string | null;
          estado?: string;
          fase?: string;
          ganador?: string | null;
          grupo_id?: string | null;
          horario?: string | null;
          id?: string;
          numero?: number;
          numero_bracket?: string | null;
          pareja_dos?: string | null;
          pareja_uno?: string | null;
          set1_dos?: number | null;
          set1_uno?: number | null;
          set2_dos?: number | null;
          set2_uno?: number | null;
          supertiebreak_dos?: number | null;
          supertiebreak_uno?: number | null;
          torneo_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "partidos_depende_partido1_fkey";
            columns: ["depende_partido1"];
            isOneToOne: false;
            referencedRelation: "partidos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "partidos_depende_partido2_fkey";
            columns: ["depende_partido2"];
            isOneToOne: false;
            referencedRelation: "partidos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "partidos_ganador_fkey";
            columns: ["ganador"];
            isOneToOne: false;
            referencedRelation: "parejas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "partidos_grupo_id_fkey";
            columns: ["grupo_id"];
            isOneToOne: false;
            referencedRelation: "grupos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "partidos_pareja_dos_fkey";
            columns: ["pareja_dos"];
            isOneToOne: false;
            referencedRelation: "parejas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "partidos_pareja_uno_fkey";
            columns: ["pareja_uno"];
            isOneToOne: false;
            referencedRelation: "parejas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "partidos_torneo_id_fkey";
            columns: ["torneo_id"];
            isOneToOne: false;
            referencedRelation: "torneos";
            referencedColumns: ["id"];
          }
        ];
      };
      torneos: {
        Row: {
          categoria: string;
          estado: string;
          fecha_fin: string;
          fecha_inicio: string;
          genero: string;
          id: string;
          imagen: string;
          titulo: string;
        };
        Insert: {
          categoria: string;
          estado: string;
          fecha_fin: string;
          fecha_inicio: string;
          genero: string;
          id?: string;
          imagen: string;
          titulo: string;
        };
        Update: {
          categoria?: string;
          estado?: string;
          fecha_fin?: string;
          fecha_inicio?: string;
          genero?: string;
          id?: string;
          imagen?: string;
          titulo?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
