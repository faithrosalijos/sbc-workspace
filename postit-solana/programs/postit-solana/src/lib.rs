use anchor_lang::prelude::*;

declare_id!("HrtnALGpHz67cyodA3tNU6axrjp3WVshXfXDtambhKBM");

#[program]
pub mod postit_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, title: String, content: String) -> Result<()> {
        let customer: &mut Account<'_, Post> = &mut ctx.accounts.customer;
        customer.title = title;
        customer.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer=signer, space=264)]
    pub customer: Account<'info, Post>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Post {
    pub title: String,
    pub content: String,
}