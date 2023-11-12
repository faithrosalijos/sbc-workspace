use anchor_lang::prelude::*;

declare_id!("HrtnALGpHz67cyodA3tNU6axrjp3WVshXfXDtambhKBM");

#[program]
pub mod postit_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, title: String, content: String) -> Result<()> {
        let base_account: &mut Account<'_, Post> = &mut ctx.accounts.base_account;
        base_account.title = title;
        base_account.content = content;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer=signer, space=264)]
    pub base_account: Account<'info, Post>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Post {
    pub title: String,
    pub content: String,
}